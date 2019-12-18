import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import BodyApp from './components/body';
import { Crypt, RSA } from 'hybrid-crypto-js'; 
import CryptoJS from 'crypto-js';
import aes from 'crypto-js/aes';
import JSEncrypt from 'jsencrypt';
import Api from '../src/services/Api';

export class App extends Component {
  constructor() {
    super();
      let iv = CryptoJS.enc.Utf8.parse('abcdefghijklmnop');
      let secretPhrase = CryptoJS.lib.WordArray.random(16);
      let salt = CryptoJS.lib.WordArray.random(128 / 8);

      let aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
          keySize: 128 / 32
      });
    this.state = {
      rsaServerPublicKey: null,
      rsaPublicKey: null,
      rsaPrivateKey: null,
      aesKey: aesKey,
      iv: iv
    };
    this.getKeyAndEncrypt = this.getKeyAndEncrypt.bind(this);
    this.getKey = this.getKey.bind(this);
  };

  getKey = () => {
    const crypt = new Crypt();
    return new Promise((resolve, reject) => {
        if(!!this.state.aesKey && !!this.state.rsaServerPublicKey){

            let rsaEncrypt = new JSEncrypt();
            rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
            let rsaEncryptedAesKey = rsaEncrypt.encrypt(this.state.aesKey.toString());
            const encrypted = crypt.encrypt(this.state.rsaServerPublicKey, this.state.aesKey);

            console.log("AesKey Encrypted with public key" + rsaEncryptedAesKey);
            resolve({ rsaEncryptedAesKey, iv: this.state.iv, encrypted });
        } else {
            Api.getPublicKey()
                .then((res) => {
                    const publicKey = res.data;


                    this.setState({rsaPublicKey: publicKey});
                    let rsaEncrypt = new JSEncrypt();
                    rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
                    let rsaEncryptedAesKey = rsaEncrypt.encrypt(this.state.aesKey.toString());
                    const encrypted = crypt.encrypt(publicKey, this.state.aesKey);

                    console.log("AesKey Encrypted with public key" + rsaEncryptedAesKey);
                    resolve({ rsaEncryptedAesKey, iv: this.state.iv, encrypted });
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        }

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
      console.log("dado criptografado          "+data);
      //console.log("AAAAAAAAAA          "+this.state.aesKey);
      //console.log("BBBBBBBBBB          "+this.state.iv);
      let aesDecTrans2 = aes.decrypt(data,this.state.aesKey.toString());
      //let aesDecTrans = CryptoJS.AES.decrypt(data,this.state.aesKey,{iv: this.state.iv ,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
      //console.log("YYYYYYYYYYYY  "+aesDecTrans2);
      //console.log(CryptoJS.enc.Utf8);
      let stringaes = aesDecTrans2.toString(CryptoJS.enc.Utf8);
      //console.log(JSON.parse(stringaes));
      return JSON.parse(stringaes);
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
