import { Component } from '@angular/core';

@Component({
	template: `
<div class="container">

<div class="row justify-content-center my-5">
    <div style="width:800px;">
        <img src="/assets/team.jpg" class="" style="width:100%;">
    </div>
</div>

<div class="row justify-content-center my-5">
    <div style="width:800px;">
        <h3>Le comité de gauche à droite...</h3>
    </div>
</div>

<div class="m-5">
    <div class="row">
        <div class="col-6 text-end">Fernand Ruelle:       </div><div class="col-6">Vice-president et circuits</div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Guy-Alain Crapet:     </div><div class="col-6">Responsable salle,bar et vêtements </div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Patrick Joly:         </div><div class="col-4">Secrétaire et correspondant</div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Myriam Duvivier:      </div><div class="col-4">Présidente et assurances</div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Laurence Bette:       </div><div class="col-4">Responsable calendrier</div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Christine Cobu:       </div><div class="col-4">Responsable affiliations </div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Michel Carlier:       </div><div class="col-4">Trésorier </div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Marie-Laurence Beriot:</div><div class="col-4">Responsable promotion</div>
    </div>
    <div class="row">
        <div class="col-6 text-end">Isabelle Gallez:      </div><div class="col-4">Responsable cuisine  </div>
    </div>
</div>

<div class="row justify-content-center my-5">
    <div style="width:800px;">
        <h3></h3>
    </div>
</div>

</div>
`
})
export class TeamComponent {}
