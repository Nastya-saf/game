export class LocalStorage {
  private storage:{[key:string]:any};
  private readonly prefix='myApp_storage';
  constructor(){    
    this.storage=window.localStorage;
  }

  public setValue(key:string, value:any):boolean{
    if(!key){      
      return false;
    }
    key=`${this.prefix}__${key}`;    
    try{
      const jsonValue=JSON.stringify(value);
      this.storage[key]=jsonValue;
      return true;
    }catch (e){      
      return false;
    }
  }

  public getValue<T>(key:string):T{
    if(!key){      
      return undefined;
    }
    key=`${this.prefix}__${key}`;    
    try{
      const storageValue=this.storage[key];
      const parsedValue=JSON.parse(storageValue);      
      return parsedValue as T;
    }catch (e){      
      return undefined;
    }
  }
}