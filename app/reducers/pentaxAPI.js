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
            let path = url+'/'+dir.name+'/'+b;
            return files.concat({
                id: b,
                src: path,
                view: path+'?size=view',
                thumb: path+'?size=thumb',  });
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

  infoPhoto(path, filename) {
    console.log('PentaxAPI.infoPhoto');

    var url = this.api+'/v1/photos/'+path+'/'+filename+'/info';
    return fetch(url)
      .then( response => response.json() )
      .then( response => {
        return jsonData;
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          isLoading: false,
          isError: true
        };
    });
  }

  downloadPhoto(path, filename) {
    console.log('PentaxAPI.downloadPhoto');

    var url = this.api+'/v1/photos/'+path+'/'+filename+'?size=full';
    return fetch(url)
      .then( response => {
        // TODO, progress bar?

        return {
          isLoading: false,
          src: response.data
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
