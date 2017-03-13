
build:
	rebar3 escriptize

clean:
	rm -rf out

clean-out:
	rm -rf out/bootstrap
	rm -rf out/erts/etc/ out/erts/example out/erts/emulator/internal_doc
	cd out && find -type d -name test -exec rm -rf {} +
	cd out && find -type d -name tutorial -exec rm -rf {} +
	cd out && find -type d -name examples -exec rm -rf {} +
	cd out && find -type d -name doc -exec rm -rf {} +
