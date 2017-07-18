import React, { Component } from 'react';

export default class PentaxAPI {
  constructor(api) {
    this.api = api;
  }

  cameraInfo() {
    // console.log('PentaxAPI.cameraInfo');

    var url = this.api+'/v1/props/device';
    return fetch(url)
      .then( response => response.json() )
      .then( jsonData => {

        return {
          loading: false,
          camera: {
            model: jsonData.model,
            firmware: jsonData.firmwareVersion
          }
        };
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          loading: false,
          error: error
        };
    });
  }

  listPhotos() {
    // console.log('PentaxAPI.listPhotos');

    var url = this.api+'/v1/photos';
    return fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        let photos = Array.apply(null, jsonData.dirs).reduce((dirs, dir) => {
          return dirs.concat(Array.apply(null, dir.files).reduce((files, file) => {
            let path = url+'/'+dir.name+'/'+file;
            return files.concat({
                id: dir.name+'/'+file,
                dir: dir.name,
                file: file,
                src: path,
                view: path+'?size=view',
                thumb: path+'?size=thumb',  });
          }, []));
        }, []);

        return {
          loading: false,
          dirs: jsonData.dirs,
          photos: photos,
        };
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          loading: false,
          error: error
        };
    });
  }

  infoPhoto(id) {
    // console.log('PentaxAPI.infoPhoto');

    var url = this.api+'/v1/photos/'+id+'/info';
    return fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        return {
          infoPhoto: jsonData,
        };
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          loading: false,
          error: error
        };
    });
  }

  downloadPhoto(id) {
    // console.log('PentaxAPI.downloadPhoto');

    var url = this.api+'/v1/photos/'+id+'?size=full';
    return fetch(url)
      .then( response => {
        // TODO, progress bar?

        return {
          loading: false,
          downloadLink: response.data
        };
      })
    .catch( error => {
      console.error('Fetch error ' + error)
      return {
          loading: false,
          error: error
        };
    });
  }
}
