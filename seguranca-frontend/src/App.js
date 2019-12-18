import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import BodyApp from './components/body';
import { Crypt, RSA } from 'hybrid-crypto-js'; 
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import Api from '../src/services/Api';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      rsaServerPublicKey: null,
      rsaPublicKey: null,
      rsaPrivateKey: null,
      aesKey: null,
      iv: null
    };
    this.getKeyAndEncrypt = this.getKeyAndEncrypt.bind(this);
    this.getKey = this.getKey.bind(this);
  };

  getKey = () => {
    const crypt = new Crypt();
    return new Promise((resolve, reject) => {
      Api.getPublicKey()
        .then((res) => {
          const publicKey = res.data;
          console.log("Received rsa public key " + publicKey);
  
          let iv = CryptoJS.enc.Utf8.parse('abcdefghijklmnop');
          let secretPhrase = CryptoJS.lib.WordArray.random(16);
          let salt = CryptoJS.lib.WordArray.random(128 / 8);
  
          let aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
            keySize: 128 / 32
          });
          console.log("AESKEY" + aesKey);
          this.setState({aesKey: aesKey, rsaPublicKey: publicKey, iv: iv});
          console.log(aesKey);
          let rsaEncrypt = new JSEncrypt();
          rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
          let rsaEncryptedAesKey = rsaEncrypt.encrypt(aesKey.toString());
          const encrypted = crypt.encrypt(publicKey, aesKey)

          console.log("AesKey Encrypted with public key" + rsaEncryptedAesKey)
          resolve({ rsaEncryptedAesKey, iv, encrypted });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    })
  }

  getKeyAndEncrypt = (data) => {
    return new Promise((resolve, reject) => {
      if(!this.state.rsaServerPublicKey || !this.state.aesKey){
        Api.getPublicKey()
        .then((res) => {
          console.log("Received rsa public key " + res.rsaPublicKey);
  
          let iv = CryptoJS.enc.Utf8.parse('abcdefghijklmnop');
          let secretPhrase = CryptoJS.lib.WordArray.random(16);
          let salt = CryptoJS.lib.WordArray.random(128 / 8);
  
          let aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
            keySize: 128 / 32
          });
          this.setState({aesKey: aesKey, rsaPublicKey: res.rsaPublicKey, iv: iv});
          resolve(this.encrypt(data));
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      } else {
        resolve(this.encrypt(data));
      }
    });
  }

  decrypt = (data,iv) => {
      console.log("SJAJDJSADS          "+data);
      console.log("AAAAAAAAAA          "+this.state.aesKey);
      console.log("BBBBBBBBBB          "+this.state.iv);
      let aesDecTrans = CryptoJS.AES.decrypt(data, this.state.aesKey,{iv: "6162636465666768696a6b6c6d6e6f7",mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
      console.log("YYYYYYYYYYYY  "+aesDecTrans);
      return JSON.parse(aesDecTrans.toString(CryptoJS.enc.Utf8));
  }

  encrypt = (data) => {
    let aesOptions = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: this.state.iv};
    let aesEncTrans = CryptoJS.AES.encrypt(JSON.stringify(data), this.state.aesKey, this.state.iv);

    let rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(this.state.rsaPublicKey);

    let rsaEncryptedAesKey = rsaEncrypt.encrypt(aesEncTrans.key.toString());

    let encryptedData = {payload: aesEncTrans.toString, encAesKey: rsaEncryptedAesKey, iv: this.state.iv};

    return encryptedData;
  }

  render() {
    return (
      <Router>
        <BodyApp
          getKey={this.getKey}
          decrypt={this.decrypt}
          getKeyAndEncrypt={this.getKeyAndEncrypt}
        />
      </Router>
  )};
}

export default App
