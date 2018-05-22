// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
      apiKey: 'AIzaSyBroz3SEP8TNMdoZfTtVQ0Emd2xKVlZNSU',
      authDomain: 'pricetrackingsystem-ab4b1.firebaseapp.com',
      databaseURL: 'https://pricetrackingsystem-ab4b1.firebaseio.com',
      projectId: 'pricetrackingsystem-ab4b1',
      storageBucket: 'pricetrackingsystem-ab4b1.appspot.com',
      messagingSenderId: '279962669917'
    },

    sendgrid: {
      apiKey: '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'
    }
};
