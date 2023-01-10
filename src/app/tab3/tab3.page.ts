import { Component, ElementRef, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { base64Encode } from '@firebase/util';
import { IonImg } from '@ionic/angular';
import { FirebaseUploadService } from '../services/firebase-upload.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('foto') foto:IonImg;
  photo:any;
  constructor(private firebaseUploadService: FirebaseUploadService) {}

  public async hazfoto(){
      const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      
    })
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.base64String;

    var signatures = {
      iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg"
    };
    if (imageUrl.charAt(0)=="/") {
      imageUrl="data:"+signatures['/9j/']+";base64,"+imageUrl;
    }else{
      imageUrl="data:"+signatures.iVBORw0KGgo+";base64,"+imageUrl;
    }
    
    // Can be set to the src of an image now
    // blob:
    //MIME
    this.foto.src = imageUrl;
    this.foto.alt="holaquetal";
  }

  public async subirfoto(){
    
    this.firebaseUploadService.addFoto({data:this.foto.src});
  }

}
