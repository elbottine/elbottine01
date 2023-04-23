import { Component } from '@angular/core';

@Component({
	template: `
<div class="main-img"></div>

<div class="container py-3">

<div class="row">
<h1 class="main-title my-5">Bienvenue sur le site des z’amis d’el bottine qui bique !</h1>
</div>

<div class="row">
    <div class="col-9">
            <!-- <h3>Présentation</h3> -->
        <p>	
        Notre club de marches fait parti de la Fédération Francophone Belge de Marches populaires ( FFBMP - Matricule HT 089).
        </p>
        <p>	
        Celui ci a été créé le 1 er janvier 2021 avec 5 fondateurs principaux sur l initiative de Patrick Joly et Fernand Ruelle, se joignent à eux:  Patrice Mouton,  Jean Pierre Jasmin et Myriam Duvivier.
        </p>
        <p>	
        Vous trouverez sur ce site toutes les informations sur les activités de notre club ainsi que nos marches annuelles.
        </p>
        <p>	
        Nous organisons une marche d'entrainement d'environ 8 km tout les mercredis.
        </p>
        <p>	
        Bienvenue
        </p>
    </div>
    <div class="col-3">
        <div class="ms-4">
            <h3 class="">Evénements</h3>
            <xyz-blogpost-summary></xyz-blogpost-summary>
        </div>
    </div>
</div>

<div class="d-flex justify-content-end">
    <div class="">
        <img src="/assets/ethias.jpg" style="width:100px;">
    </div>
    <div class="ms-5">
        <img src="/assets/logo-ffbmp.jpg" style="width:100px;">
    </div>
</div>

</div>
`
})
export class PageComponent {}
