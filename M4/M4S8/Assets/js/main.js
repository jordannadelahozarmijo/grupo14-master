console.log(fetch('https://reqres.in/'))

fetch('https://reqres.in/api/users').then(res => console.log(res))

fetch('https://reqres.in/api/users').then(res => res.json())

fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then (data => console.log(data))
