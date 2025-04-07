# Mouse Variation Registry User Interface (MVAR)

An Angular single page application built to interface with MVAR API:
https://github.com/TheJacksonLaboratory/mvar-core


#### Requirements

- Node V 16
- Angular cli V 14.2.13

### Local setup

Clone repo:
    
    git clone git@github.com:TheJacksonLaboratory/mvar-frontend.git

Install Node v16

    https://nodejs.org/en/download

Install angular cli

    sudo npm install -g @angular/cli@14.2.13 

Run npm install
 
    sudo npm install --legacy-peer-deps

Run the front-end application

    ng serve

Build command

    ng build --base-href=/ -c test  (sqa environment)
    ng build --base-href=/ -c production (production environment)


