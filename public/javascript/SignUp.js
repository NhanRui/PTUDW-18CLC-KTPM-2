function checkName(){
    var ho = document.getElementById('ho');
    var ten = document.getElementById('ten');
    if(ho.value.length === 0 || ten.value.length === 0 ){
        alert("Không được để trống họ và tên");
        tk.focus();
        return false;
    }
    for(var i=0; i<ho.value.length;i++){
        if(!isNaN(ho.value.charAt(i))||ho.value.charAt(i)){
            if(ho.value.charAt(i)===' '){
                continue;
            }
            alert("Tên không thể có số ---> vị trí "+i+1);
            ho.focus();
            return false;
        }
    }
    for(var i=0; i<ten.value.length;i++){
        if(!isNaN(ten.value.charAt(i))){
            if(ho.value.charAt(i)===' '){
                continue;
            }
            alert("Tên không thể có số ---> vị trí "+i+1);
            ten.focus();
            return false;
        }
    }
    return true;
}

function isNull(){
    var tk = document.getElementById('tk');
    var pass = document.getElementById('pass');
    if(tk.value.length === 0 ){
        alert("Không được để trống tài khoản đăng nhập");
        tk.focus();
        return false;
    }
    if(pass.value.length === 0 ){
        alert("Xin hãy nhập mật khẩu")
        pass.focus();
        return false;
    }
    return true;
}

$("#frmSignUp").on('submit',function(event){
    event.preventDefault();
    if(checkName()===false) return;
    if(isNull()===false)    return;

    const email = $("#tk").val();
    if(email.length === 0)  {
        alert('Invalid data');
        return;
    }

    $.getJSON(`/account/is-available?email=${email}`, function(data){
        if(data === true){
            $("#submit").off('submit').submit();
        }else{
            alert('This email has been registered !!');
        }
    })
})

