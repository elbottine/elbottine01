import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
	selector: 'xyz-spinner-component',
	template: `
	<div class="ctr-spinner-container" *ngIf="show">
    <div class="ctr-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    </div>
    </div>`,
	styles: [`
.ctr-spinner-container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: rgba(42, 54, 60, 0.3);
}

.ctr-spinner {
	top: 50%;
	left: 50%;
	color: official;
	display: inline-block;
	position: relative;
	width: 100px;
	height: 100px;
	margin-top: 25px;
	margin-left: -50px;
}

.ctr-spinner div {
	transform-origin: 50px 50px;
	animation: ctr-spinner 1.2s linear infinite;
}

.ctr-spinner div:after {
	content: " ";
	display: block;
	position: absolute;
	top: 100px;
	left: 50px;
	width: 5px;
	height: 50px;
	background: rgb(42, 54, 60);
}

.ctr-spinner div:nth-child(1)  { transform: rotate(0deg);   animation-delay: -1.15s; }
.ctr-spinner div:nth-child(2)  { transform: rotate(15deg);  animation-delay: -1.10s; }
.ctr-spinner div:nth-child(3)  { transform: rotate(30deg);  animation-delay: -1.05s; }
.ctr-spinner div:nth-child(4)  { transform: rotate(45deg);  animation-delay: -1.00s; }
.ctr-spinner div:nth-child(5)  { transform: rotate(60deg);  animation-delay: -0.95s; }
.ctr-spinner div:nth-child(6)  { transform: rotate(75deg);  animation-delay: -0.90s; }
.ctr-spinner div:nth-child(7)  { transform: rotate(90deg);  animation-delay: -0.85s; }
.ctr-spinner div:nth-child(8)  { transform: rotate(105deg); animation-delay: -0.80s; }
.ctr-spinner div:nth-child(9)  { transform: rotate(120deg); animation-delay: -0.75s; }
.ctr-spinner div:nth-child(10)  { transform: rotate(135deg); animation-delay: -0.70s; }
.ctr-spinner div:nth-child(11)  { transform: rotate(150deg); animation-delay: -0.65s; }
.ctr-spinner div:nth-child(12)  { transform: rotate(165deg); animation-delay: -0.60s; }
.ctr-spinner div:nth-child(13)  { transform: rotate(180deg); animation-delay: -0.55s; }
.ctr-spinner div:nth-child(14)  { transform: rotate(195deg); animation-delay: -0.50s; }
.ctr-spinner div:nth-child(15)  { transform: rotate(210deg); animation-delay: -0.45s; }
.ctr-spinner div:nth-child(16)  { transform: rotate(225deg); animation-delay: -0.40s; }
.ctr-spinner div:nth-child(17)  { transform: rotate(240deg); animation-delay: -0.35s; }
.ctr-spinner div:nth-child(18)  { transform: rotate(255deg); animation-delay: -0.30s; }
.ctr-spinner div:nth-child(19) { transform: rotate(270deg); animation-delay: -0.25s; }
.ctr-spinner div:nth-child(20)  { transform: rotate(285deg); animation-delay: -0.20s; }
.ctr-spinner div:nth-child(21) { transform: rotate(300deg); animation-delay: -0.15s; }
.ctr-spinner div:nth-child(22)  { transform: rotate(315deg); animation-delay: -0.10s; }
.ctr-spinner div:nth-child(23) { transform: rotate(330deg); animation-delay: -0.05s; }
.ctr-spinner div:nth-child(24)  { transform: rotate(345deg); animation-delay:  0s; }

@keyframes ctr-spinner {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}`]
})
export class SpinnerComponent implements OnInit {
	constructor(private spinnerService: SpinnerService, private appRef: ApplicationRef) {
	}

	private showTimer: any;
	show: boolean;

	public ngOnInit() {
		this.spinnerService.registerCallback((show: boolean) => show ? this.showSpinner() : this.hideSpinner());
	}

	private showSpinner() {
		if (this.showTimer) { return; }
		this.showTimer = setTimeout(() => this.showSpinnerElement(true), 150);
	}

	private hideSpinner() {
		if (this.showTimer) {
			clearTimeout(this.showTimer);
		}
		this.showTimer = undefined;
		this.show = false;
        setTimeout(() => this.appRef.tick(), 150);       
	}

	private showSpinnerElement(show: boolean) {
		this.show = show;
	}
}
