// POO - Javascript 

class ClassName {
    constructor() {
        this.property = 'value';
    }

    method() {
        console.log('This is a method');
    }
    
    #privateMethod() {
        console.log('This is a private method');
    }

    _protectedMethod() {
        console.log('This is a protected method');
    }

    static staticMethod() {
        console.log('This is a static method');
    }
}

var obj = new ClassName();
obj.method(); // This is a method
obj._protectedMethod(); // This is a protected method

ClassName.staticMethod(); // This is a static method