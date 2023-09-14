import { Component } from '@angular/core';

@Component({
	template: `
<div class="main-img"></div>

<div class="container py-3">

<div class="row">
<p class="main-title p-4">Bienvenue sur le site des z’amis d’el bottine qui bique HT089 !</p>
</div>

<div class="row">
    <div class="col-lg-9">

        <p>	
        Notre club de marches fait partie de la Fédération Francophone Belge de Marches populaires ( FFBMP - Matricule HT 089).
        </p>
        <p> 
        Celui-ci a été créé le 1 er janvier 2021 avec 5 fondateurs principaux sur l’initiative de Patrick Joly et Fernand Ruelle, se joignent à eux:  Patrice Mouton,  Jean Pierre Jasmin et Myriam Duvivier.
        </p>
        <p> 
        Vous trouverez sur ce site toutes les informations sur les activités de notre club ainsi que nos marches annuelles.
        </p>
        <p>
        Nous organisons une marche d'entrainement d'environ 8 km tous les mercredis.
        </p>
        <p>
        L'amitié par la marche.
        </p>
        <p>
        Les z'amis de Dour.
        </p>
        <p> 
        Bienvenue
        </p>

        <!-- <div class="container overflow-hidden">
            <div class="grid-wrapper">
                <div class="big lc-block">
                    <img class="img-fluid rounded" src="/assets/group1.jpg">
                </div>
                <div class="c31 lc-block">
                    <img class="img-fluid rounded" src="/assets/group5.jpg">
                </div>
                <div class="lc-block">
                    <img class="img-fluid rounded" src="/assets/group3.jpg">
                </div>                
                <div class="lc-block">
                    <img class="img-fluid rounded" src="/assets/group6.jpg">
                </div>        
                <div class="c31 lc-block">
                    <img class="img-fluid rounded" src="/assets/group7.jpg">
                </div>        
                <div class="wide lc-block">
                    <img class="img-fluid rounded" src="/assets/group2.jpg">
                </div>
                <div class="big lc-block">
                    <img class="img-fluid rounded" src="/assets/group4.jpg">
                </div>
            </div>
        </div> -->
    </div>

    <div class="col-lg-3 d-none d-lg-block">
        <div class="ms-4">
            <h3 class="">Evénements</h3>
            <xyz-blogpost-summary></xyz-blogpost-summary>
        </div>
    </div>
</div>

<div class="d-flex justify-content-around p-5">
    <div class="">
        <img src="/assets/ethias.jpg" style="width:100px;">
    </div>
    <div class="ms-5">
        <img src="/assets/logo-ffbmp.jpg" style="width:100px;">
    </div>
    <div class="ms-5">
        <img src="/assets/logo2.jpg" style="width:60px;">
    </div>
</div>

</div>
`
})
export class PageComponent {}
