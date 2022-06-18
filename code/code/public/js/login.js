form.addEventListener('submit', () => {
    const login = {
        username: username.value,
        password: password.value,
    }
const result = fetch('api/login',{ 
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
}).then((res) => res.json())

if (result.status === 'ok') {
    console.log('Got the token: ', result.data)
    //  console.log(req.user)
    alert('success')
    window.location.href = '/index_signin'
}else 
{
 alert ('jhj',result.error)
}