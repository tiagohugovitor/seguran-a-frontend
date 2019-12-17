"use strict";
const client_node_1 = require("@aws-crypto/client-node");
const RSA = require('hybrid-crypto-js').RSA;
const rsa = new RSA();
const crypto_1 = require('crypto');
const util_1 = require("util");
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const unencryptedMasterKey = crypto_1.randomBytes(32);
const generateKeyPairAsync = util_1.promisify(rsa.generateKeyPair);

async function aesEncryptTest (message) {

    let hashCypherText = await rsaEncryptTest(hashData(message));
    hashCypherText = JSON.stringify(hashCypherText);
    const cleartext = message.concat(hashCypherText);
    const keyName = 'aes-name';
    const keyNamespace = 'aes-namespace';
    const wrappingSuite = client_node_1.RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING;
    const keyring = new client_node_1.RawAesKeyringNode({ keyName, keyNamespace, unencryptedMasterKey, wrappingSuite });
    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app'
    };
    const  { result }  = await client_node_1.encrypt(keyring, cleartext, { encryptionContext: context });
    let json1 = result.toString('utf8');
    console.log("Mensagem + hash cifrados: "+json1);
    return {result};
};
exports.aesEncryptTest= aesEncryptTest;

async function aesDecryptTest(result){
    console.log(result);
    result = decoder.write(Buffer.from(result.result.data));
    console.log(result);
    const keyName = 'aes-name';
    const keyNamespace = 'aes-namespace';
    const wrappingSuite = client_node_1.RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING;
    const keyring = new client_node_1.RawAesKeyringNode({ keyName, keyNamespace, unencryptedMasterKey, wrappingSuite });

    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app',
    };

    const { plaintext, messageHeader } = await client_node_1.decrypt(keyring, result);
    let json2 = plaintext.toString('utf8');
    json2 = JSON.parse(json2);
    console.log("Mensagem + hash decifrados: "+json2);
    return {json2};
};

exports.aesDecryptTest = aesDecryptTest;

function hashData (data){
    return crypto_1.createHash('md5').update(data).digest("hex");
};
exports.hashData = hashData;

async function rsaEncryptTest(cleartext) {

    const keyName = 'rsa-name';
    const keyNamespace = 'rsa-namespace';
    const rsaKey = await generateRsaKeys();
    const keyring = new client_node_1.RawRsaKeyringNode({ keyName, keyNamespace, rsaKey });

    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app'
    };

    console.log(cleartext);
    const { result } = await client_node_1.encrypt(keyring, cleartext, { encryptionContext: context });
    let hash = result.toString('utf8');
    console.log("Hash criptografado: ");
    console.log(hash);

    return { hash };
}
exports.rsaEncryptTest = rsaEncryptTest;

async function rsaDecryptTest(cryptoText) {
    const keyName = 'rsa-name';
    const keyNamespace = 'rsa-namespace';
    const rsaKey = await generateRsaKeys();
    const keyring = new client_node_1.RawRsaKeyringNode({ keyName, keyNamespace, rsaKey });

    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app'
    };

    const { plaintext, messageHeader } = await client_node_1.decrypt(keyring, cryptoText);
    const { encryptionContext } = messageHeader;
    let json2 = plaintext.toString('utf8');
    console.log("Texto decifrado:");
    console.log(json2);

    return {json2}
}
exports.rsaDecryptTest = rsaDecryptTest;

async function generateRsaKeys() {
    const modulusLength = 3072;
    const publicKeyEncoding = { type: 'pkcs1', format: 'pem' };
    const privateKeyEncoding = { type: 'pkcs1', format: 'pem' };
    // @ts-ignore
    return generateKeyPairAsync('rsa', {
        modulusLength,
        publicKeyEncoding,
        privateKeyEncoding
    });
}