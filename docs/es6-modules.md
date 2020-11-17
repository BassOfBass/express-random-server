# ES6 modules info

Example of a ES6 module script:
```pug
script(type="module" crossorigin src="/js/module/main.mjs")
script(nomodule src="/js/main.js" defer)
```
## `type="module"`

These types of scripts:

- always run in `use strict` mode
- always run in their own scope
- are defered by default
- the browsers which understand this tag will skip initialization of scripts with `nomodule` flag
- the server need to serve them with correct MIME type, the recommended one is `text/javascript`.

## `crossorigin` flag

As per [this article](https://jakearchibald.com/2017/es-modules-in-browsers/#credentials-by-default):

> However, that means you'll encounter three exciting varieties of browser support:
>
>- Old versions of browsers that, against the spec at the time, sent credentials by to same-origin URLs by default.
>- Browsers that followed the spec at the time, and did not send credentials to same-origin URLs by default.
>- New browsers that follow the new spec, and send credentials to same-origin URLs by default.
>
> If you hit this issue, you can add the `crossorigin` attribute, which will add credentials to same-origin requests, but not cross-origin request, in any browser that follows the old spec. It doesn't do anything if the browser follows the new spec, so it's safe to use.