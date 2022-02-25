const puppeteer = require('puppeteer');
const jwt=require('jsonwebtoken');
require('dotenv').config({path:'local.env'});

exports.login= async (req,res)=>{
        try {
            const{legajo,password}=req.body;

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
        
            await page.goto(`${process.env.SYSACAD}`);
        
            await page.waitForSelector('input[name=legajo]');
        
            await page.type('input[name=legajo]',legajo); 
            await page.type('input[name=password]',password);
            await page.click('input[name=loginbutton]');
            
            await page.waitForSelector('.textoTabla');
        
            const links = await page.evaluate( ()=> {
                const elements = document.querySelectorAll('.textoTabla li a');
                const links = []
                for (let element of elements){
                    links.push(element.href)
                }
                return links
            })

            await browser.close();

            if(links){
            const token = links[0].split('-');
            //crear y firmar el JWT
            const payload={
                user:{
                    legajo:legajo,
                    password:password,
                    token:token[1]
                }
            }

            //firmar el JWT
            jwt.sign(payload,process.env.SECRET,{
                        expiresIn:3600
                    },(error,token)=>{
                        if(error) throw error;
                        //Mensaje
                        res.json({msg:'OK',token});
                    }
                )
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Hubo un error'});
        }

}