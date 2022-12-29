const upload_Md = require('./git-push.js');
const createNew_Md = require('./newCreate.js')
const shell = require('shelljs')
const queryString = require('query-string');
const axios = require("axios").default;
const axiosRetry = require('axios-retry');

setTimeout(() => {
  console.log('force exit');
  process.exit(0)
}, 30 * 60 * 1000);

axiosRetry(axios, {
  retries: 100,
  retryDelay: (retryCount) => {
    // console.log(`retry attempt: ${retryCount}`);
    return 3000 || retryCount * 1000;
  },
  retryCondition: (error) => {
    return error.response.status === 502;
  },
});


const listProject = `https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/erratic-shade-ketch|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/branched-changeable-kettle|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/seemly-sponge-iris|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/agate-tangy-stool|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/beautiful-fork-twine|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/piquant-canary-asp|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/mini-lively-spell|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/ancient-northern-mechanic|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/intriguing-flower-corleggy|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/artistic-magnificent-howler|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/chivalrous-western-soul|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/boom-terrific-woodwind|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/material-discovered-gasosaurus|https://e0b3eb35-41ea-4a76-a2ab-82716b5f3b7e@api.glitch.com/git/flint-puzzle-dogsled`.trim().split('|');

const delay = t => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(true);
    }, t);
  });
};

(async () => {
  try {
    let accountNumber = 0;

    for (let i = 0; i < listProject.length; i++) {
      accountNumber = i + 1;
      try {
        const nameProject = listProject[i].split('/')[4]
        console.log('deploy', nameProject);
        createNew_Md.run(nameProject)
        await upload_Md.upload2Git(listProject[i].trim(), 'code4Delpoy');
        console.log(`account ${accountNumber} upload success ^_^`);

        axios
          .get(`https://eager-profuse-python.glitch.me/deploy?${queryString.stringify({
            email: listProject[i].trim() + ' true'
          })}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log('Loi');
            }
          });

        if (i + 1 < listProject.length) await delay(1.8 * 60 * 1000);
      } catch (error) {
        console.log(`account ${accountNumber} upload fail ^_^`);
        axios
          .get(`https://eager-profuse-python.glitch.me/deploy?${queryString.stringify({
            email: listProject[i].trim() + ' false'
          })}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log('Loi');
            }
          });
      }

      if (process.cwd().includes('code4Delpoy')) shell.cd('../', { silent: true });

    }

    await delay(20000)
    console.log('Done! exit')
    process.exit(0)

  } catch (err) {
    console.log(`error: ${err}`);
  }
})();