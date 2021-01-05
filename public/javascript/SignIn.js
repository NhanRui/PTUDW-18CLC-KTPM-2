function checktkNull(){
    var tk = document.getElementById('tk');
    if(tk.value.length === 0 ){
        alert("Không được để trống tài khoản đăng nhập");
        tk.focus();
        return false;
    }
    return true;
}

function checkpassNull(){
    var pass = document.getElementById('pass');
    if(pass.value.length === 0 ){
        alert("Xin hãy nhập mật khẩu")
        pass.focus();
        return false;
    }
    return true;
}

document.getElementById('submit').addEventListener('click',function(event){
    if(checktkNull()===false)   event.preventDefault();
    if(checkpassNull()===false) event.preventDefault();
})