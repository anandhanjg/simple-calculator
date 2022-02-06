
let optValue={
    '+':1,
    '-':1,
    '*':2,
    '/':2
}

document.getElementById('screen').value=""
function update(value) {
    if(document.getElementById('screen').value=='0') document.getElementById('screen').value=""
    document.getElementById('screen').value=document.getElementById('screen').value+value
}

function result() {
    let valueQue=[]
    let optStack=[]
    let stack=[]

    try{

        let value=document.getElementById('screen').value;
    let result=0
    let val=''
    for(var i=0;i<value.length;i++){
        let char=value[i]
        if(optValue[char]){
            if(val!=''){
                valueQue.push(val);
                val='';
            }
            if(optStack.length!=0 && (optValue[char] == optValue[optStack[optStack.length-1]] || optValue[char]<optValue[optStack[optStack.length-1]])){
                    valueQue.push(optStack.pop());   
            }

            optStack.push(char);
        }else if(char>='0' && char<='9'){
            val+=char;
        }else{
            result="Error";
            throw result;
        }
    }


    if(val!=''){
        valueQue.push(val);
        val=''
    }else{
        result='Syntax Error';
        throw result;
    }

    let l=optStack.length;

    for(var i=0;i<l;i++){
        valueQue.push(optStack.pop());
    }

    for(var i=0;i<valueQue.length;i++){
        switch(valueQue[i]){
            case '+':
                stack.push(stack.pop()+stack.pop())
                break;
            case '-':
                stack.push(stack.pop()-stack.pop())
                break;
            case '*':
                stack.push(stack.pop()*stack.pop())
                break;
            case '/':
                stack.push(stack.pop()/stack.pop())
                break;
            default:
                stack.push(Number(valueQue[i]));
                break;
        }  
    }
    result=stack.pop()
         document.getElementById('screen').value=result;
    }catch(err){
        document.getElementById('screen').value=err;
    }
    valueQue=[]
    optStack=[]
    stack=[]
}

function form_reset() {
    document.getElementById('screen').value=""
}