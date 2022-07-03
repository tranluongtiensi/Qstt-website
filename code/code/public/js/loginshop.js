form.addEventListener('submit', async () => {
    const loginshop = {
        username: user.value,
        password: password.value
    }
const result = await fetch('/api/login',{ 
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginshop)
}).then((res) => res.json())

if (result.status === 'ok') {
    console.log('Got the token: ', result.data)
    alert(result.success)
    window.location.href = '/index_login_shop'
}else 
  {
 alert (result.error)
   }
})