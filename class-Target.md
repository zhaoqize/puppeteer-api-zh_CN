- [class: Target](#class-target)
  * [target.createCDPSession()](#targetcreatecdpsession)
  * [target.page()](#targetpage)
  * [target.type()](#targettype)
  * [target.url()](#targeturl)

### class: Target

#### target.browser()

- returns: <[Browser]>

Get the browser the target belongs to.

#### target.browserContext()

- returns: <[BrowserContext]>

The browser context the target belongs to.

#### target.createCDPSession()
- returns: <[Promise]<[CDPSession]>>

Creates a Chrome Devtools Protocol session attached to the target.

#### target.page()
- returns: <[Promise]<?[Page]>>

If the target is not of type `"page"`, returns `null`.

#### target.type()
- returns: <[string]>

Identifies what kind of target this is. Can be `"page"`, `"service_worker"`, `"browser"` or `"other"`.

#### target.url()
- returns: <[string]>
