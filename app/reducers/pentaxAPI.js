import React, { Component } from 'react';

export default class PentaxAPI {
  constructor(api) {
    this.api = api;
  }

  cameraInfo() {
    console.log('PentaxAPI.cameraInfo');

    var url = this.api+'/v1/props/device';
    return fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log('jsonData', jsonData);
        
        return {
          isConnected: true,
          camera: {
            model: jsonData.model,
            firmware: jsonData.firmwareVersion
          }
        };
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          isLoading: true,
          isError: true
        };
    });
  }

  listPhotos() {
    console.log('PentaxAPI.listPhotos');

    var url = this.api+'/v1/photos';
    return fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log('jsonData', jsonData);
        let photos = Array.apply(null, jsonData.dirs).reduce((dirs, dir) => {
          return dirs.concat(Array.apply(null, dir.files).reduce((files, b) => {
            return files.concat({ id: b, src: url+'/'+dir.name+'/'+b });
          }, []));
        }, []);

        return {
          isLoading: false,
          dirs: jsonData.dirs,
          photos: photos,
        };
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          isLoading: false,
          isError: true
        };
    });
  }
}
