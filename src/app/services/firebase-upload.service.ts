import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { error } from 'console';
import { Foto } from '../model/foto';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUploadService {

  private lastDoc : QueryDocumentSnapshot<any>;
  private dbPath: string = 'fotos';
  private dbRef: AngularFirestoreCollection<any>
  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection(this.dbPath);
  }

  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }

  public async addFoto(foto:Foto): Promise<Foto> {
    let newFoto = await this.dbRef.add(foto);
    return foto;
  }
}
/*return new Promise((resolve, reject) => {
        
        const pictureRef = this.storage.ref(this.location + imageName);

        pictureRef
        .put(imageData)
        .then(function(){
          pictureRef.getDownloadURL().subscribe((url:any) => {
            resolve(url);
          }) 
        }).catch((error) => {
          reject(error);
        })
      })

    } */
