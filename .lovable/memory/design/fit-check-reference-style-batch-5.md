---
name: Fit Check reference style batch 5
description: UI rules from final reference batch covering signup wizard, success state, forgot password, notifications, history filters, saved articles, search results, support chat, delete account flows, change password, FAQ Q&A, guest mode, empty/offline states, and about screen.
type: design
---

Final reference batch (Thai-language mobile screens, 9:19 phone frame, white canvas with subtle mint accents). Apply these patterns consistently:

## Signup wizard (3 steps)
- Top: back arrow left, centered title "สมัครสมาชิก", short subtitle below.
- Numbered ProgressSteps (1-2-3) with teal filled circles for completed/current, gray outline for pending; step labels below each circle (ข้อมูลบัญชี / ข้อมูลส่วนตัว / เสร็จสิ้น).
- Step 1: account info (email, password) — already covered.
- Step 2 (personal): age range dropdown, gender as 3 icon tiles (ชาย/หญิง/ไม่ระบุ) with selectable cards, height/weight numeric inputs with unit suffix, exercise level as radio list with descriptions in parens.
- Step 2b (goals & activity): goals as 2x3 grid of icon tiles (large colored line icon + Thai label, max 6). Activities as wrap-flow pill chips, multi-select. "อื่น ๆ (ระบุ)" free-text input below.
- Footer: pair of buttons — outline "ย้อนกลับ" + filled teal "ถัดไป" / "สร้างบัญชี".
- Step 3 success: centered illustration (thumbs-up character + big green check), "สมัครสำเร็จ! ยินดีต้อนรับสู่ Fit Check 🎉", checklist of 4 benefits with teal icons, primary CTA "เริ่มประเมินอาการ", secondary outline "ไปที่หน้าหลัก".

## Forgot password / reset
- Centered lock+envelope illustration, supportive copy, email field, full-width teal CTA "ส่งลิงก์รีเซ็ตรหัสผ่าน", text link "กลับเข้าสู่ระบบ".
- Info card with clock icon listing 3 troubleshooting bullets (check spam, wait 1-2 min, contact us).
- "ส่งอีเมลแล้ว!" confirmation: paper-plane illustration, masked email shown, bullet list of next steps, resend button with countdown "(59s)".

## Notifications
- Tabs: ทั้งหมด / ยังไม่อ่าน / สำคัญ as segmented pills; teal-filled active.
- Grouped by day: วันนี้ / เมื่อวาน / สัปดาห์นี้.
- Each row: colored circle icon (yellow bell, teal runner, blue book, orange flame, blue shield) + title + 2-line description + right-side timestamp + unread green dot.
- Top-right action: "ตั้งค่า" or filter icon. Bottom CTA outline "ดูการแจ้งเตือนทั้งหมด >".
- Notification settings: large bell icon, 3 toggle category cards (ติดตามอาการ / แผนกิจกรรม / บทความใหม่), primary "อนุญาต" + text "ไม่อนุญาตตอนนี้".

## History filters
- Sheet/page "ตัวกรองประวัติการประเมิน" with "ล้างทั้งหมด" top-right.
- Sections: ระดับผลลัพธ์ (checkboxes with color dots: เขียว/เหลือง/แดง), กิจกรรม (checkboxes), ช่วงเวลา (radios + custom date range with calendar icons), อาการดีขึ้น/แย่ลง (emoji segmented: 😀 ดีขึ้น / 🙂 ดีขึ้น / 😐 เท่าเดิม / 😟 แย่ลง).
- Footer: filled teal "แสดงผล", outline "ยกเลิก".

## Saved articles / Guide
- Tabs ทั้งหมด / บทความ / วิดีโอ / คู่มือ with count badges "(12)".
- Article card: left rounded illustration, title (2 lines), category chip (teal pill), date "บันทึกเมื่อ ...", right chevron, bookmark icon top-right.
- Empty state: large open-box bookmark illustration, "คุณยังไม่มีบทความที่บันทึก", helper line, primary CTA "ไปที่คู่มือและความรู้".

## Search results
- Sticky search field with magnifying glass + clear (✕) button, "ยกเลิก" text button right.
- Tabs with counts: บทความ (18) / วิดีโอ (6) / FAQ (5).
- Result cards same shape as articles. Below: "เกี่ยวข้องกับการค้นหา" — wrap of tag pills (gray bg).

## Support chat
- Header: back arrow, "แชทกับเรา / แชทกับทีมงาน Fit Check", 3-dot menu.
- Agent card row: avatar, name, status pill ● ออนไลน์ (green) or hours.
- Bubbles: incoming = white with mint border, left-aligned; outgoing = teal filled, white text, right-aligned; timestamp small gray.
- Typing indicator: three animated dots in bubble.
- Footer: shielded notice "ช่องทางนี้ใช้สำหรับคำถามการใช้งานแอป ไม่ใช่บริการวินิจฉัยหรือการรักษา หากมีอาการรุนแรง กรุณาติดต่อแพทย์ทันที".
- Input bar: attach (📎), text field, send arrow in teal circle.

## Delete account flow
- Step 1: trash icon, red headline "คุณแน่ใจหรือไม่ที่จะลบบัญชี?", subtitle warning irreversible, red-bulleted list of what gets deleted, type "ลบ" input, full-width red destructive "ลบบัญชีอย่างถาวร", outline "ยกเลิก".
- Step 2 confirm: same shape, lighter list with red x-circle icons.

## Change password
- Lock icon header, 3 password fields (each with eye toggle), green-check validation hints below (≥8 chars, upper+lower, number/symbol), full-width teal "บันทึกการเปลี่ยนแปลง".

## Assessment history empty / offline
- Empty: clipboard+magnifier illustration with mint foliage, headline + helper, primary teal CTA "เริ่มประเมินอาการ", small text link "เรียนรู้เพิ่มเติมเกี่ยวกับ Fit Check".
- Offline: cloud-with-! icon, headline "ไม่สามารถเชื่อมต่ออินเทอร์เน็ต", helper, primary "↻ ลองใหม่อีกครั้ง", outline "ใช้งานออฟไลน์", small footnote.

## Red flag alert
- Centered ⚠ red badge, headline "Red Flag Alert" / "สัญญาณอันตรายที่พบ".
- Soft red alert card listing symptoms with red triangle bullets.
- Doctor illustration row + reassurance text.
- Primary destructive red button with phone icon "ติดต่อผู้เชี่ยวชาญ / หน่วยบริการ", two outline buttons below.

## FAQ
- Topic page header "FAQ: ..." with bookmark + share top-right.
- Q/A blocks: teal "Q" circle + question, white card; "A" circle + answer paragraph. Source list section "แหล่งอ้างอิง" with bullets. Bottom: "ข้อมูลนี้มีประโยชน์กับคุณหรือไม่?" with 👍 มีประโยชน์ / 👎 ไม่ใช่ outline buttons.
- Accordion list version: rows with Q badge + question + chevron-down to expand.

## Guest mode
- Spy/incognito icon, headline "คุณอยู่ในโหมดไม่ระบุตัวตน".
- Green check list of privacy guarantees.
- Mint info card listing limitations with red x icons.
- CTAs: primary teal "เริ่มการประเมิน", outline "เข้าสู่ระบบ / สมัครสมาชิก Fit Check".

## About / version screen
- Centered teal runner icon + bold "FIT CHECK" + version "เวอร์ชัน 2.1.0 (Build 2100)".
- Description paragraph, copyright line.
- List of nav links: ข้อกำหนดการใช้งาน / นโยบายความเป็นส่วนตัว / เครดิต / โอเพนซอร์สไลเซนส์ — each as row with left icon + label + chevron.

## Cross-cutting rules
- Status bar mock: 9:41 left, signal/wifi/100% right; keep on every screen.
- Bottom nav (5 tabs): ประเมิน 🏠 / ฟื้นฟู 🏃 / คู่มือ 📖 / บันทึก 📋 / เพิ่มเติม •••. Active tab teal, others gray.
- All destructive actions = red (#DC2626-ish); all primary positive actions = teal/green brand.
- Illustrations are soft, friendly, vector style with mint foliage accents — never photoreal.
- Always include safety disclaimer where relevant; never frame as diagnosis.
