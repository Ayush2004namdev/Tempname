let a = false
         let agraFrigit = (document.getElementById('agraFrigit'))
            let looseprice
            let chandigharFrigit = (document.getElementById('chandigharFrigit'))
            let damtalFrigit = (document.getElementById('damtalFrigit'))
            let dehradunFrigit = (document.getElementById('dehradunFrigit'))
            let ExPlantFrigit = (document.getElementById('ExPlantFrigit'))
            let delhiFrigit = (document.getElementById('delhiFrigit'))
            let agracfa = (document.getElementById('agracfa'))
            let chandigharcfa = (document.getElementById('chandigharcfa'))
            let damtalcfa = (document.getElementById('damtalcfa'))
            let dehraduncfa = (document.getElementById('dehraduncfa'))
            let ExPlantcfa = (document.getElementById('ExPlantcfa'))
            let delhicfa = (document.getElementById('delhicfa'))
             let packingCostTin = 1
             let packingCostPouch = 1
             let intrestTin = 1
             let intrestPouch = 1
            let agradirect = (document.getElementById('agradirect'))
            let chandighardirect = (document.getElementById('chandighardirect'))
            let damtaldirect = (document.getElementById('damtaldirect'))
            let dehradundirect = (document.getElementById('dehradundirect'))
            let ExPlantdirect = (document.getElementById('ExPlantdirect'))
            let delhidirect = (document.getElementById('delhidirect'))

            document.querySelector('#okok').addEventListener('submit' , (event) => {
                
            event.preventDefault()
            document.querySelector('.slide1').classList.add('none')
            document.querySelector('.slide2').classList.remove('none')
            
            looseprice = parseFloat(document.getElementById("looseprice").value)
            agraFrigit.value = 1
            chandigharFrigit.value = 2
            damtalFrigit.value = 2.5
            dehradunFrigit.value = 3
            ExPlantFrigit.value = 0
            delhiFrigit.value = 2.5
            agraFrigitvalue = 1
            chandigharFrigitvalue = 2
            damtalFrigitvalue = 2.5
            dehradunFrigitvalue = 3
            ExPlantFrigitvalue = 0
            delhiFrigitvalue = 2.5
            
            })

           function fun(){
            document.querySelector('.slide2').classList.add('none')
            document.querySelector('.slide3').classList.remove('none')
            document.querySelector('.selectoptions').classList.add('none')
            document.querySelector(".agraDirect").classList.add('none')
            }

            function fun2(){
                document.querySelector('.slide2').classList.add('none')
                document.querySelector('.slide4').classList.remove('none')
                document.querySelector('.selectoptions').classList.add('none')
                document.querySelector(".agraCfa").classList.add('none')
            }
           
            function hellobuddy(){
                document.querySelector('.slide2').classList.add('none')
                document.querySelector('.selectoptions').classList.remove('none')
            }
            function hellobuddy1(){
                document.querySelector('.slide3').classList.add('none')
                document.querySelector('.slide5').classList.remove('none')
                agracfa = parseFloat(agracfa.value)
                damtalcfa = parseFloat(damtalcfa.value)
                delhicfa = parseFloat(delhicfa.value)
                dehraduncfa = parseFloat(dehraduncfa.value)
                ExPlantcfa = parseFloat(ExPlantcfa.value)
                chandigharcfa = parseFloat(chandigharcfa.value)
            }
            function hellobuddy2(){
                document.querySelector('.slide4').classList.add('none')
                document.querySelector('.slide5').classList.remove('none')
                agradirect = parseFloat(agradirect.value)
                damtaldirect = parseFloat(damtaldirect.value)
                delhidirect = parseFloat(delhidirect.value)
                dehradundirect = parseFloat(dehradundirect.value)
                ExPlantdirect = parseFloat(ExPlantdirect.value)
                chandighardirect = parseFloat(chandighardirect.value)
            }
        
            
        
        document.querySelector('#costs').addEventListener('submit' , (event) => {
            document.querySelector('.slide5').classList.add('none')
            document.querySelector('.slide6').classList.remove('none')
            event.preventDefault()
            packingCostTin = parseFloat(document.getElementById('packingCostTin').value)
            packingCostPouch = parseFloat(document.getElementById('packingCostPouch').value)
            intrestTin = parseFloat(document.getElementById('intrestTin').value)
            intrestPouch = parseFloat(document.getElementById('intrestPouch').value)
            console.log({agradirect , agracfa})
            let cfacalculation = 15*looseprice + 15.94*agraFrigitvalue + agracfa + packingCostTin + intrestTin + (15*looseprice + 15.94*agraFrigitvalue + agracfa + packingCostTin + intrestTin)*5/100
            console.log(cfacalculation)
            let directcalculation = 1*looseprice + 0.97*agraFrigitvalue + agradirect + packingCostTin + intrestTin + (1*looseprice + 0.97*agraFrigitvalue + agradirect + packingCostTin + intrestTin)*5/100
            const cfaRate = document.querySelector('#cfaRate')
            const directRate = document.querySelector('#directRate')
            cfaRate.innerText = cfacalculation
            directRate.innerText = directcalculation    
        })
