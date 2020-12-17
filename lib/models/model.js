'use strict';

class Model{
  constructor(schema){
    this.schema = schema;
  }
  
  get(id){
    let inputId = id ? {_id:id} : {};
    // console.log('our schema',this.schema.find(inputId));
    return this.schema.find(inputId);
  }
  create(object){
    let newObject = new this.schema(object);
    return newObject.save();
  }
  update(id,object){
    return this.schema.findByIdAndUpdate(id,object,{new:true});
  }
  delete(id){
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Model;