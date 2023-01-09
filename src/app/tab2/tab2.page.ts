import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonImg } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private todo: FormGroup;
  @ViewChild('foto') foto:IonImg;
  photo:any;
  constructor(
    private formBuilder:FormBuilder,
    private noteS:NotesService,
    private uiS:UiService
  ) {
    this.todo = this.formBuilder.group({
      title :['',[Validators.required,
                  Validators.minLength(5)]],
      description : ['']
    })
  }

  public async hazfoto(){
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
    
  })

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  let imageUrl = image.base64String;
  console.log(image);
  console.log(imageUrl);

  var signatures = {
    iVBORw0KGgo: "image/png"
  };
  imageUrl="data:"+signatures.iVBORw0KGgo+";base64,"+imageUrl;
  // Can be set to the src of an image now
  // blob:
  //MIME
  this.foto.src = imageUrl;
  this.foto.alt="holaquetal";
}


  public async logForm(){
    if(!this.todo.valid) return;
    await this.uiS.showLoading();
    try{
      await this.noteS.addNote({
        title:this.todo.get('title').value,
        description:this.todo.get('description').value,
        photo:this.foto.src
      });
      this.todo.reset("");
      this.uiS.showToast("¡Nota insertada correctamente!");
    }catch(err){
      console.error(err);
      this.uiS.showToast(" Algo ha ido mal ;( ","danger");
    } finally{
      this.uiS.hideLoading();
    }
    
    
  }

}
