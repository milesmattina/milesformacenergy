# Miles for MAC Energy

An independent Brand Manager application by Miles Mattina, based on the approved `milesmattina/miles-for-ritual` source at commit `958b4e8`. The original project and deployment are unchanged.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

The approved introduction, eight-card deck, three case studies, media, links, resume PDF and viewer are preserved. Only company and resume-object references change. Official MAC Energy branding was studied at https://drinkmac.com/ on November 12, 2026. The white wordmark comes from that official site. The palette follows its charcoal, off-white and orange colors. Anton is a freely available substitute for its proprietary condensed display face; the body uses Helvetica/Arial.

The custom satin-silver can has a hinged pull tab, a sliding resealable lid and a rising resume ticket. Closing retracts the ticket, slides the lid shut and folds the tab down. Keyboard and touch activation, reduced motion, animation locks and a transition timeout are supported. The existing resume viewer supports download, zoom/fit, minimize/restore and full/half screen.

Portfolio images and posters remain pre-optimized and eager; videos download on visibility and play muted, inline, looping, without controls or picture-in-picture. The website-build timelapse remains absent.

## Infrastructure

Standalone Next.js project. No Supabase client, project, database, storage bucket, credentials, environment variables, API calls or visitor tracking are configured. The unused inherited SQL migration was removed from this copy. No existing backend was changed.

The supplementary career documents were reviewed as private context only and are not included in the repository or site.
