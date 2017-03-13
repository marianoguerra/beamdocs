beamdocs
========

An escript to generate a json file with module info for each erl file found
and then generate an index to make it easy to search functions.

Build
-----

::

    $ rebar3 escriptize

Run
---

::

    $ ./_build/default/bin/beamdocs to-json ~/src/erl/otp/ ./out

clean up the out folder to leave only the ones you want and then generate the
index::

    $ ./_build/default/bin/beamdocs to-index ./out ./index.json

Web UI
------

Check gh-pages branch or https://marianoguerra.github.io/beamdocs/ for a simple
search UI.

License
-------

MIT
