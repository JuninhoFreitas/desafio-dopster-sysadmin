import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
const port = process.env.PORT || 5000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.delete('/account/:id',(req,res)=>{
    fetch('https://api.mail.tm/accounts/'+req.params.id,{
        method:'DELETE',
        headers:{'Content-Type':'*/*','authorization':req.headers.authorization},
    }).then(res=>res.json()).then(data=>{
        return res.json(data)
    });
})
app.get('/account',(req,res)=>{
    fetch('https://api.mail.tm/me',{
        method:'GET',
        headers:{'accept':'application/json','Authorization':req.headers.authorization},
    }).then(res=>res.json()).then(data=>{
        return res.json(data);
    });
    
})
app.post('/account/:qtd',async (req,res)=>{
    const quantity = req.params.qtd;
    if(quantity>5){
        return res.json({error:'quantity max 5'});
    }
    const domain = await getDomains().then(data=>{
        return data['hydra:member'][0]['domain']
    })
    let response = []
    
    
    
    return res.json(await bombCreate(quantity,req,domain));
    
})
app.post('/account',async (req,res)=>{
    
    const domain = await getDomains().then(data=>{
        return data['hydra:member'][0]['domain']
    })

    const accountCredentials = {
        address:req.body.email+'@'+domain,
        password:req.body.password
    }
    createAccount(accountCredentials).then(data=>{
        res.json(data)
    });
    
})
app.post('/token',async(req,res)=>{
    const token = await getToken(req.body.email,req.body.password).then(data=>{
        return data
    })
    res.send(token);
})
async function bombCreate(quantity,req,domain){
    let response = []
    for (let i = 0; i < quantity; i++) {
        const accountCredentials = {
            address:`${req.body.email}${i}@${domain}`,
            password:req.body.password
        }
        await createAccount(accountCredentials).then(data=>{
            response.push(data);
        });
    }
    return response;
}
async function createAccount(credential){
    return fetch('https://api.mail.tm/accounts',{
        method:'POST',
        headers:{'Content-Type':'application/ld+json','accept':'application/ld+json'},
        body:JSON.stringify(credential)
    }).then(res=>res.json()).then(data=>{
        return (data);
    });
}
async function getToken(email,pass){
    return await fetch('https://api.mail.tm/token',{
        method:'POST',
        headers:{'Content-Type':'application/json','accept':'application/json'},
        body:JSON.stringify({address:email,password:pass}),
    }).then(res=>res.json()).then(data=>{
        return data
    });
}
async function getDomains(){
    return await fetch('https://api.mail.tm/domains',{
        method:'GET',
        headers:{'Content-Type':'application/ld+json','accept':'application/ld+json'}
    }).then(res=>res.json()).then(data=>{
        return data
    });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
