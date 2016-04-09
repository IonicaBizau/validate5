/**
 * Having the following HTML markup
 *
 * <form action="#" method="get" accept-charset="UTF-8" style="margin-left:6px;">
 *     <div class="container">
 *         <input type="text" name="name" placeholder="Your Name" autofocus required/><br/>
 *     </div>
 *     <div class="container">
 *         <input type="email" name="email" placeholder="Your Email" required/><br/>
 *     </div>
 *     <div class="container">
 *         <input type="text" name="text" title="Invalid ZIP code." pattern="\d{5}-?(\d{4})?" placeholder="ZIP (5 numbers)" required/><br/>
 *     </div>
 *     <div class="container">
 *         <input type="submit" value="Submit" />
 *     </div>
 * </form>
 **/

// To validate the forms on submit, use:
validate5("form");
