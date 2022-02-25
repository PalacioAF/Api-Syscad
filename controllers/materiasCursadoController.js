const puppeteer = require('puppeteer');
require('dotenv').config({path:'local.env'});

exports.GET= async (req,res)=>{
    
        const {legajo,password,token} = req.session;
                
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        try {
            await page.goto(process.env.SYSACAD);
        
            await page.waitForSelector('input[name=legajo]');
        
            await page.type('input[name=legajo]',legajo); 
            await page.type('input[name=password]',password);
            await page.click('input[name=loginbutton]');
            
            await page.waitForSelector('.textoTabla');
        
            await page.goto(`${process.env.MATERIASCURSADO}${legajo}-${token}`);

            try {
                await page.waitForSelector('.tituloTabla');

                const materiasCursado= await page.evaluate( ()=> {
                    const tds = document.querySelectorAll('table tbody .textoTabla');
                    let items = []
                    for (let element of tds){
                        let td = Array.from(element.querySelectorAll('td')).map(element => element.innerText);
                        items.push(Object.assign({},td))
                    }
                    //Elimino HeaderTable
                    items.splice(0,1)
                    return items
                })

                if(materiasCursado){
                res.json({msg:'OK',res:materiasCursado});
                }
            }
            catch(error) {
                    try {
                        await page.waitForSelector('.textoError');
            
                        const element = await page.evaluate( ()=> {
                            const element = document.querySelector('.textoError');
                            return element.innerText
                        })
                        res.json({msg:'OK',res:element});
                        
                    } catch(error) {
                        throw new Error(error);
                    }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Hubo un error'});
        }
        finally{
            await browser.close();
        }
}