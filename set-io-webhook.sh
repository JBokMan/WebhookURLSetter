#!/usr/bin/env bash

# kill old ngrok
PID=$(pgrep -f ngrok)
if [ ! -z $PID ]
then
  kill $PID
fi

# start ngrok
$(~/ngrok http 8080 --log=stdout > ngrok.log) &

# fetch ngrok URL
URL=$(node NgrokUrlFetcher)
if [[ ! "$URL" == https://* ]] || [[ ! "$URL" == *.ngrok.io ]]
then
	echo 'NgrokUrlFetcher did not return a valid URL: ' $URL
  PID=$(pgrep -f ngrok)
  kill $PID
  exit 1
fi

# copy URL to clipboard
echo -n $URL | xclip -selection clipboard

# set URL in sipgateio
cd SipgateIoWebhookUrlSetter
STATUS=$(node index.js $URL)
if [ STATUS != 0 ]
then
  echo 'Something went wrong setting the URL in sipgateio: ' $STATUS
  PID=$(pgrep -f ngrok)
  kill $PID
  exit 1
fi
