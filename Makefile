
build:
	rebar3 escriptize

clean:
	rm -rf out docs

md-all: build clean
	mkdir -p docs/md
	./_build/default/bin/beamdocs docs-to-all $$CODE_PATH docs/all
	./_build/default/bin/beamdocs copy-resources $$CODE_PATH docs/all

md: build clean
	mkdir -p docs/md
	./_build/default/bin/beamdocs docs-to-md $$CODE_PATH docs/md
	./_build/default/bin/beamdocs docs-to-mdast $$CODE_PATH docs/md
	./_build/default/bin/beamdocs copy-resources $$CODE_PATH docs/md

md-ets: build clean
	mkdir -p docs/md
	./_build/default/bin/beamdocs doc-to-all $$CODE_PATH $$CODE_PATH/lib/stdlib/doc/xml/ets.xml docs/md

html: build clean
	mkdir -p docs/html
	./_build/default/bin/beamdocs docs-to-html $$CODE_PATH docs/html

mkdocs: md mkdocs-only mkdocs-build

mkdocs-serve:
	cd mkdocs-site/site && python3 -m http.server

mkdocs-all: md-all mkdocs-all-only mkdocs-build

mkdocs-only-common:
	rm -rf mkdocs-site
	mkdir -p mkdocs-site/docs
	cp resources/mkdocs.yml mkdocs-site
	cp resources/mkdocs-index.md mkdocs-site/docs/index.md

mkdocs-only: mkdocs-only-common
	cp -r docs/md/* mkdocs-site/docs/

mkdocs-all-only: mkdocs-only-common
	cp -r docs/all/* mkdocs-site/docs/

mkdocs-build:
	cd mkdocs-site && mkdocs build
