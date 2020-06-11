import { trigger, state, style, transition, group, query, animateChild, animate } from '@angular/animations';

export const animations = [
    trigger('menu-ul', [
        state('stop', style({
            backgroundColor: '#111',
        })),
        state('animate', style({
            backgroundColor: '#fff',
        })),
        transition('* <=> *', [
            group([
                query('@disk', animateChild()),
                query('@info', animateChild()),
                query('@player-control', animateChild()),
                query('@current', animateChild()),
                query('@drop-menu', animateChild()),
                animate('500ms ease-in'),
            ]),
        ])
    ]),

    trigger('disk', [
        state('stop', style({
            transform: 'scale(1) translate(-50%, 0)',
            top: '20%',
            left: '50%'
        })),
        state('animate', style({
            transform: 'scale(0.15) translate(-50%, 0)',
            top: '50px',
            left: '50px'
        })),
        transition('* <=> *', animate('500ms ease-in'))
    ]),

    trigger('info', [
        state('stop', style({
            left: '50%',
            top: '60%'
        })),
        state('animate', style({
            left: '165px',
            top: '65px'
        })),
        transition('* <=> *', [
            group([
                query('@info-title-text', animateChild()),
                animate('500ms ease-in'),
            ]),
        ])
    ]),

    trigger('info-title-text', [
        state('stop', style({
            margin: '0 0 5px 29px',
            color: '#fff'
        })),
        state('animate', style({
            margin: '0',
            color: '#111'
        })),
        transition('* <=> *', animate('500ms ease-in'))
    ]),

    trigger('player-control', [
        state('stop', style({
            transform: 'scale(1) translate(-50%, 0)',
            left: '50%',
            bottom: '100px',
        })),
        state('animate', style({
            transform: 'scale(0.5) translate(-50%, 0)',
            left: '0',
            bottom: '-7px'
        })),
        transition('* <=> *', animate('500ms ease-in'))
    ]),


    trigger('drop-menu', [
        state('stop', style({
            height: '0px',
            opacity: '0',
            position: 'absolute',
            bottom: '-100%'
        })),
        state('animate', style({
            height: '100%',
            opacity: '1',
            position: 'absolute',
            bottom: '0'
        })),
        transition('* <=> *', animate('500ms ease-in'))
    ]),

    trigger('current', [
        state('stop', style({
            bottom: '-100%'
        })),
        state('animate', style({
            bottom: '10px'
        })),
        transition('* <=> *', animate('500ms ease-in'))
    ]),

    trigger('current', [
        state('stop', style({
            bottom: '-100%'
        })),
        state('animate', style({
            bottom: '10px'
        })),
        transition('* <=> *', animate('500ms ease-in'))
    ]),
];
