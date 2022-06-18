form.addEventListener('submit', () => {
    const register = {
        username: user.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        phone: tel.value
    }
    const result = fetch('/api/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
     }).then((res) => res.json())
     console.log(register.username)
     if (result.status === 'ok') {
        alert('success')
        window.location.href = '/login'
     }else {
       alert (result.error)
     }
})


  
