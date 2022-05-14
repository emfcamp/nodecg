FROM node:slim

EXPOSE 9090

RUN apt-get update && apt-get install git python3 build-essential -y

# Install NodeCG, and symlink our bundle into place
WORKDIR /usr/src/nodecg
RUN npm install --global nodecg-cli
RUN nodecg setup 1.9.0
RUN ln -s /usr/src/emf-bundle bundles/emf-nodecg

# Copy and build the EMF bundle
ADD . /usr/src/emf-bundle
WORKDIR /usr/src/emf-bundle
RUN npm install
RUN ./node_modules/.bin/parcel build

WORKDIR /usr/src/nodecg
CMD ["nodecg", "start"]