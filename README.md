# EMF NodeCG Graphics

This repository contains the hastily thrown together stage graphics from
EMF 2022. If for some reason you want to run it you'll need to do the following:

1. `docker compose build --parallel`
2. `docker compose up`
3. You should now be able to connect to http://localhost:9090 which
   will show you the NodeCG dashboard.
4. When you make changes to anything in `src/` run `./bin/build` in
   `parcel` container. (If you're using the VSCode devcontainer you'll
   be attached to that container).

The Graphics button in the top right of the dashboard will allow you to see
the various views for stages. The tabs on the left allow controlling the
current state of each stage.

The stage views for reasons I can't work out require cueing the interstitial
mode before the live mode works. 🤷‍♂️
