import firebase from 'firebase';
import firebaseConfig from './../firebaseConfig';
import * as tf from '@tensorflow/tfjs';

class DatabaseManager {

  static tryToInitDatabase () {
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
      }else {
          firebase.app()
      } 
  }

  static setAiModelToLocalStorage(aiModel){
      return aiModel.save(process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH_TF)
  }

  static setAiModelToFirebaseFromLocalStorage(){
      this.tryToInitDatabase()

        firebase.database().ref("ai_manager").child("info").set(localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH}/info`));
        firebase.database().ref("ai_manager").child("model_topology").set(localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH}/model_topology`));
        firebase.database().ref("ai_manager").child("weight_specs").set(localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH}/weight_specs`));
        firebase.database().ref("ai_manager").child("weight_data").set(localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH}/weight_data`));
        firebase.database().ref("ai_manager").child("model_metadata").set(localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH}/model_metadata`));
  }

  static setAiModel(aiModel) {

    this.setAiModelToLocalStorage(aiModel).then(() => {
          this.setAiModelToFirebaseFromLocalStorage();
    })
  }

  static getAiModelPartFromFirebaseToLocalStorage(part){

      this.tryToInitDatabase()
        firebase.database().ref("ai_manager").child(part).get().then(snapshot => {
          localStorage.setItem(`tensorflowjs_models/aicasso-model/${part}`, snapshot.toJSON())
        }).catch(error => {
          console.error(error);
        })

  }

  static getModelFromFirebaseToLocalStorage() {
        this.tryToInitDatabase()

          this.getAiModelPartFromFirebaseToLocalStorage("info")
          this.getAiModelPartFromFirebaseToLocalStorage("model_topology")
          this.getAiModelPartFromFirebaseToLocalStorage("weight_specs")
          this.getAiModelPartFromFirebaseToLocalStorage("weight_data")
          this.getAiModelPartFromFirebaseToLocalStorage("model_metadata")

  }

  static getModelFromLocalStorage() {
      return tf.loadLayersModel(process.env.REACT_APP_LOCALSTORAGE_MODEL_PATH_TF);
  }

  static getModel() {
      this.getModelFromFirebaseToLocalStorage()
      return this.getModelFromLocalStorage()
  }


}

export default DatabaseManager;