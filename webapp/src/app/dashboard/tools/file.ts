/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function b64ToBlob(b64Data, contentType = "", sliceSize = 512) {
  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export function b64ToUrl(b64Data, contentType = "", sliceSize = 512) {
  var blob = b64ToBlob(b64Data, contentType, sliceSize);
  return URL.createObjectURL(blob);
}

//Takes a base64 document string in the format:
//data:image/jpeg;base64,/9j/4AAQSkZJRgABAg
//and returns an object:
//{
//  'fileType': 'image/jpeg',
//  'docString': '/9j/4AAQSkZJRgABAg'
//}
export function fullDocStringToFileTypeAndDocString(
  fullDocString: string
): Object {
  var beg = fullDocString.indexOf(":") + 1;
  var endFileType = fullDocString.indexOf(";");
  var fileType = fullDocString.slice(beg, endFileType);
  var begDocString = fullDocString.indexOf("base64,") + 7;
  var docString = fullDocString.slice(begDocString);
  return {
    fileType: fileType,
    docString: docString,
  };
}
