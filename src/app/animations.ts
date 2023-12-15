import {
  animateChild,
  style,
  transition,
  trigger,
  query,
  group,
  animate,
  state,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('newPage <=> newBlankPage', [
    style({
      position: 'relative',
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
    ]),
  ]),

  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ left: '100%', opacity: 0 })),
      ]),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
      query('@*', animateChild()),
    ]),
  ]),
]);

export const btnAnimation = trigger('btnAnim', [
  state(
    'def',
    style({
      position: 'relative',
      scale: '.8',
    })
  ),
  state(
    'scale',
    style({
      scale: '1.6',
    })
  ),
  state(
    'rot',
    style({
      scale: '1.2',
      transform: 'rotate(360deg)',
    })
  ),
  transition('* <=> *', [animate('200ms')]),
]);
