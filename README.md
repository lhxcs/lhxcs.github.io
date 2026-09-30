# My personal webpage

## Page views

The site uses [Busuanzi](https://busuanzi.ibruce.info/) to display total
site views in each page's footer and individual essay views below the title.
These are page views, not unique visitors; repeat visits count again. Counts
start accumulating when the integration is deployed, with no historical backfill.

`views.js` loads the counter asynchronously on HTTP(S) pages and skips local
previews (`localhost`, loopback addresses, `.localhost`, `.local`, and `file:`).
Counters stay hidden until data arrives, including when the service is blocked
or unavailable. No account, API key, or application server is needed.

The provider stores counts and receives visitors' requests. Its script sends
the page URL as the referrer so essays are counted separately; totals are tied
to the site's hostname and page URLs. Changing the domain or an essay URL may
therefore start a separate counter. Availability and accuracy depend on the
third-party service.

When adding a page, include `views.js` with `defer` (use `../views.js` in
`posts/`) and copy the `busuanzi_container_site_pv` footer markup. For an essay,
also copy `busuanzi_container_page_pv` into the article metadata. Keep each
counter ID unique within the page. Load `views.js` after `blog.js` so old
language links are normalized before counting.
