import {
  type LearningModule,
  makeCSlide as C,
  makeMcSlide as MC,
  makeSaSlide as SA,
  makeTfSlide as TF,
  makeMtSlide as MT,
  makeDdBucketSlide as DDBucket,
  finalizeModule,
} from './curriculumTypes';

const mod06ConsumerImg = '/assets/modules/mod-06-consumer.svg';
const mod07IrlSkillsImg = '/assets/modules/mod-07-irl-skills.svg';
const mod08BanksImg = '/assets/modules/mod-08-banks.svg';
const mod09DebtImg = '/assets/modules/mod-09-debt.svg';
const mod10InvestingImg = '/assets/modules/mod-10-investing.svg';

export const CURRICULUM_MODULES_6_TO_10: LearningModule[] = [
  // =========================================================================
  // MODULE 6: CONSUMER SKILLS
  // =========================================================================
  finalizeModule({
    id: 'mod-06-consumer-skills',
    numberLabel: 'Module 06',
    title: 'Consumer Skills',
    category: 'Smart Money Habits',
    duration: '6 Lessons',
    xpReward: 150,
    accentColor: 'cyan',
    gradientClass: 'from-cyan-500/25 via-indigo-500/10 to-slate-900',
    heroImage: mod06ConsumerImg,
    summary:
      'Master everyday consumer decisions: multiple streams of income, fixed vs. variable expenses, the 50/30/20 budget rule, smart spending with unit prices & the 24-hour rule, smart saving with sinking funds, and an intro to investing.',
    keySkills: ['50/30/20 Budget', 'Unit Price & 24-Hr Rule', 'Pay Yourself First', 'Index Funds & ETFs'],
    lessons: [
      {
        id: 'm6-l1',
        number: 1,
        title: 'Types of Income',
        slides: [
          C('m6-l1-c1', 'C1', 'You already know income means money coming in. But not all income is created equal.'),
          C('m6-l1-c2', 'C2', 'Understanding the types of income you can earn is the first step in thinking about how to grow your wealth.'),
          C('m6-l1-c3a', 'C3', "Remember it's not just about having a single high-paying job. It's about multiple streams of income (MSI)."),
          C('m6-l1-c3b', 'C3', 'Earned income — money you work for. Wages, salaries, tips, freelance payments. This is the most common type and usually the starting point for everyone.'),
          C('m6-l1-c4', 'C4', 'Passive income — money that comes in without you actively working for it.'),
          C('m6-l1-c5a', 'C5', 'For example, rental income from a property, royalties from a book or music, a business that runs on its own. This is the goal for a lot of financially savvy people.'),
          C('m6-l1-c6a', 'C6', "Portfolio income — income from investments: profits from selling stocks, dividends earned, interest from bonds. While it is also passive, it's technically its own category."),
          MC(
            'm6-l1-p1',
            'P1',
            'Which type of income requires you to actively work for it?',
            ['Passive income', 'Portfolio income', 'Earned income', 'Dividend income'],
            2
          ),
          C('m6-l1-c5b', 'C5', "Side hustle income — a term you've probably heard. This is additional earned income outside of your main job. Freelancing, reselling, content creation, tutoring, gig work. For a lot of young adults, this is where extra income comes from."),
          C('m6-l1-c6b', 'C6', 'Transfer income — money received from government programs or family: financial aid, scholarships, gifts, Social Security, child support. This counts as income but may or may not be taxable depending on the source.'),
          C('m6-l1-c7', 'C7', 'Why does this matter? Because the path to financial freedom isn\'t just "earn more at your job." It\'s about diversifying where money comes from so you\'re not 100% dependent on one source.'),
          SA('m6-l1-p2', 'P2', 'Which of the following are examples of passive income?', [
            { label: 'Wages from a part-time job', isCorrect: false },
            { label: 'Rental income from a property', isCorrect: true },
            { label: 'Dividends from stocks you own', isCorrect: true },
            { label: 'Freelance design work', isCorrect: false },
            { label: 'Royalties from a book you wrote', isCorrect: true },
          ]),
          MT('m6-l1-p3', 'P3', 'Match income type to example:', [
            { left: 'Earned income', right: 'Working a shift at a restaurant' },
            { left: 'Passive income', right: 'Collecting rent from a tenant' },
            { left: 'Portfolio income', right: 'Selling stock for a profit' },
            { left: 'Side hustle', right: 'Selling handmade jewelry online' },
            { left: 'Transfer income', right: 'A college scholarship' },
          ]),
        ],
      },
      {
        id: 'm6-l2',
        number: 2,
        title: 'Understanding Your Expenses',
        slides: [
          C('m6-l2-c1', 'C1', 'You know expenses are what go out. What you might not know is why categorizing them is important.'),
          C('m6-l2-c2a', 'C2', 'It helps you understand your habits and gives you control of where your money goes.'),
          C('m6-l2-c2b', 'C2', "Fixed expenses are the same every month. Rent, car payment, loan payment, insurance premiums. They're consistent, easy to plan for, and should be top priority."),
          C('m6-l2-c3', 'C3', 'Variable expenses always change month to month. Groceries, gas, dining out, entertainment. This is where most people can adjust.'),
          C('m6-l2-c4', 'C4', "Discretionary expenses are 'wants' rather than 'needs.' Streaming subscriptions, new clothes, concerts, takeout. Not bad to have — but the first category to cut if money gets tight."),
          SA('m6-l2-p1', 'P1', 'Which of the following are fixed expenses?', [
            { label: 'Monthly rent', isCorrect: true },
            { label: 'Groceries', isCorrect: false },
            { label: 'Car insurance payment', isCorrect: true },
            { label: 'Going to the movies', isCorrect: false },
            { label: 'Student loan payment', isCorrect: true },
          ]),
          C('m6-l2-c5', 'C5', "Non-discretionary expenses are 'needs.' Housing, food, transportation, utilities, healthcare. These are harder to cut and should be the foundation of your budget."),
          C('m6-l2-c6', 'C6', "Understanding which expenses are fixed vs variable, and discretionary vs non-discretionary, gives you a map of your spending. You can see quickly where you have wiggle room and where you don't."),
          C('m6-l2-c7', 'C7', "A useful mindset shift: instead of only thinking 'how do I make more money,' also think 'where is money leaving that I don't really need it to?'"),
          C('m6-l2-c8', 'C8', "Small reductions in recurring expenses add up over a full year. Just like interest, everything adds up. Don't overlook how expensive spending $4 everyday at a vending machine is."),
          MC(
            'm6-l2-p2',
            'P2',
            'Which type of expense gives you the most flexibility to reduce?',
            [
              'Fixed expenses',
              'Discretionary expenses',
              'Non-discretionary expenses',
              'All expenses are equally flexible',
            ],
            1
          ),
          TF('m6-l2-p3', 'P3', [
            { text: 'Fixed expenses change every month.', isTrue: false },
            { text: 'Groceries are a variable expense.', isTrue: true },
            { text: 'Non-discretionary expenses are things you can easily cut from your budget.', isTrue: false },
          ]),
          DDBucket(
            'm6-l2-p4',
            'P4',
            "Sort into 'Fixed' vs 'Variable' expenses:",
            ['Fixed', 'Variable'],
            [
              { label: 'Monthly rent', category: 'Fixed' },
              { label: 'Gas for your car', category: 'Variable' },
              { label: 'Streaming subscription', category: 'Fixed' },
              { label: 'Dining out', category: 'Variable' },
              { label: 'Phone bill', category: 'Fixed' },
              { label: 'Clothing shopping', category: 'Variable' },
            ]
          ),
        ],
      },
      {
        id: 'm6-l3',
        number: 3,
        title: 'Budgeting — Building Your Plan',
        slides: [
          C('m6-l3-c1', 'C1', "A budget is just a plan. It's not a punishment or something telling you that you can't have fun."),
          C('m6-l3-c2', 'C2', "It's deciding ahead of time where your money goes instead of wondering where it went when it's gone."),
          C('m6-l3-c3', 'C3', 'One of the most popular budgeting frameworks is the 50/30/20 rule: 50% of your take-home pay for needs · 30% for wants · 20% for savings and debt repayment.'),
          C('m6-l3-c4', 'C4', 'This is a starting point, not a law. Each person can change this to suit their lifestyle.'),
          C('m6-l3-c5', 'C5', 'Someone with a high cost of living might need 60% for needs. Someone focused on saving fast might flip it and do 50% savings. The point is to have a framework.'),
          C('m6-l3-c6a', 'C6', 'Step 1: Know your monthly take-home income (net pay — after taxes and deductions).'),
          C('m6-l3-c7a', 'C7', "Doesn't have to be exact, but it's a good idea to know more or less. And don't lie when building your budget. You're only lying to yourself."),
          C('m6-l3-c8a', 'C8', 'If your income varies month to month, get the average and always round down. Rounding down helps make sure you always have your bases covered and maybe even end up saving more than you expected.'),
          MC(
            'm6-l3-p1',
            'P1',
            'Using the 50/30/20 rule, if your monthly take-home is $2,000, how much should go toward savings/debt repayment?',
            ['$200', '$600', '$400', '$1,000'],
            2
          ),
          C('m6-l3-c9a', 'C9', 'Step 2: List all your fixed expenses. This is your non-negotiable baseline — rent, utilities, subscriptions, phone, loan payments, insurance. These happen regardless.'),
          C('m6-l3-c6b', 'C10', 'Step 3: Estimate your variable expenses. What do you typically spend on food, gas, entertainment, and personal care? Track your last 2–3 months to get a realistic number.'),
          C('m6-l3-c7b', 'C11', "Step 4: Subtract total expenses from income. If the number is positive, great — that's your surplus, which goes to savings or extra debt payoff. If negative, something needs to change."),
          SA('m6-l3-p2', 'P2', 'Good budgeting habits include:', [
            { label: 'Knowing your monthly take-home pay', isCorrect: true },
            { label: 'Guessing your expenses', isCorrect: false },
            { label: 'Tracking fixed and variable expenses separately', isCorrect: true },
            { label: 'Spending every dollar you earn', isCorrect: false },
            { label: 'Adjusting your budget when income or expenses change', isCorrect: true },
          ]),
          TF('m6-l3-p3', 'P3', [
            { text: 'The 50/30/20 rule must be followed exactly or your budget is wrong.', isTrue: false },
            { text: 'A budget surplus is the amount left after all expenses are covered.', isTrue: true },
            { text: 'Tracking past spending helps you estimate future variable expenses.', isTrue: true },
          ]),
          C('m6-l3-c8b', 'C12', "It might seem like too much work, but it doesn't have to be. There are many apps that connect to your bank and help you budget or simply track your spending."),
          C('m6-l3-c9b', 'C13', "Remember, you don't always have to stick to your budget down to the dollar. But it is important to have a general idea and make sure you are controlling your cash flow. Surprises are fun, but not to your bank account."),
        ],
      },
      {
        id: 'm6-l4',
        number: 4,
        title: 'Smart Spending',
        slides: [
          C('m6-l4-c1', 'C1', "Spending money isn't bad — spending money carelessly is. Smart spending means getting the most value out of every dollar you spend."),
          C('m6-l4-c2', 'C2', 'Believe it or not, even how you pay can affect your habits. Each method has its place.'),
          C('m6-l4-c3', 'C3', 'Credit cards with rewards are great when you pay them off monthly.'),
          C('m6-l4-c4', 'C4', 'Cash is useful for discretionary spending (harder to overspend when you can see the bills disappearing).'),
          C('m6-l4-c5', 'C5', 'And debit just keeps things simple.'),
          C('m6-l4-c6', 'C6', "There's more to it than just how to spend. Comparing products is something we do every single day."),
          C('m6-l4-c7', 'C7', 'Unit price is a massively underused tool. When choosing between sizes or brands at a store, the unit price (cost per oz, per item, per unit) tells you the real value.'),
          C('m6-l4-c8', 'C8', "A bigger package isn't always cheaper per unit. This is important, you don't want to overpay for goods."),
          C('m6-l4-c9', 'C9', "Unit just means one. Usually bigger items give better deals for buying in bulk, but it isn't always the case."),
          MC(
            'm6-l4-p1',
            'P1',
            "You're choosing between a 12 oz bottle of juice for $3 and a 20 oz bottle for $4. How do you know which is the better value per ounce?",
            [
              'Divide cost by oz — the 12 oz is cheaper ($0.25/oz)',
              'Divide cost by oz — the 20 oz is cheaper ($0.20/oz)',
              'Divide oz by cost so 12 oz wins',
              "They're equal",
            ],
            1
          ),
          C('m6-l4-c10', 'C10', 'Impulse buying, the biggest budget killer. This is when you buy something randomly just because. Could be emotions, an ad, or just being bored.'),
          C('m6-l4-c11', 'C11', "There is a whole science behind getting people to buy their product impulsively. You're better — think twice about whether you should actually get it."),
          C('m6-l4-c12', 'C12', "The 24-hour rule: if you see something you want that isn't a need, wait 24 hours before buying it."),
          C('m6-l4-c13', 'C13', 'Most impulse purchases lose their appeal within a day. This simple trick saves real money and stops you from buying useless items.'),
          C('m6-l4-c14', 'C14', 'Subscriptions are sneaky. Most people underestimate how many they have.'),
          C('m6-l4-c15', 'C15', 'A streaming service here, an app there, a membership somewhere else. They add up.'),
          C('m6-l4-c16', 'C16', 'And they can add up fast.'),
          C('m6-l4-c17', 'C17', "They're everywhere now, so make sure you're checking your accounts or using an app to track how many you have."),
          C('m6-l4-c18', 'C18', "You don't want to randomly check one day and see you've been charged $15 for something you don't even use."),
          SA('m6-l4-p2', 'P2', 'Smart spending habits include:', [
            { label: 'Using the unit price to compare value', isCorrect: true },
            { label: 'Always buying the brand name', isCorrect: false },
            { label: 'Waiting 24 hours before impulse purchases', isCorrect: true },
            { label: 'Auditing subscriptions regularly', isCorrect: true },
            { label: 'Paying for every purchase with BNPL apps', isCorrect: false },
          ]),
          TF('m6-l4-p3', 'P3', [
            { text: 'The 24-hour rule helps reduce impulse buying.', isTrue: true },
            { text: 'A larger package always has a better unit price than a smaller one.', isTrue: false },
            { text: "Subscriptions are easy to track because they're small amounts.", isTrue: false },
          ]),
        ],
      },
      {
        id: 'm6-l5',
        number: 5,
        title: 'Smart Saving',
        slides: [
          C('m6-l5-c1', 'C1', "Saving money is a habit — and like any habit, it's easier to maintain when you have a system. Save smarter, not just harder."),
          C('m6-l5-c2', 'C2', 'Pay yourself first. This is one of the most powerful saving principles out there.'),
          C('m6-l5-c3', 'C3', 'The moment money hits your account, transfer a set amount to savings before you spend anything. Treat it like a bill you owe to future you.'),
          C('m6-l5-c4', 'C4', 'Automate it. Set up an automatic transfer from your checking to your savings account on the day you get paid.'),
          C('m6-l5-c5', 'C5', "Willpower alone doesn't always get people moving, so just make it automatic."),
          C('m6-l5-c6', 'C6', 'Start saving for an emergency fund, before saving for anything else.'),
          C('m6-l5-c7', 'C7', "Life happens and you don't know when you'll need some extra cash. Aim to build 3–6 months of expenses in an accessible savings account."),
          C('m6-l5-c8', 'C8', 'It may seem like a lot. But a financial buffer can be make or break for a lot of people when surprises happen.'),
          MC(
            'm6-l5-p1',
            'P1',
            "What does 'pay yourself first' mean?",
            [
              'Spend on yourself before paying bills',
              'Transfer money to savings before spending the rest',
              'Earn money through self-employment',
              "Avoid paying others until you're secure",
            ],
            1
          ),
          C('m6-l5-c9', 'C9', 'Once your emergency fund is solid, think about savings goals.'),
          C('m6-l5-c10', 'C10', 'Depending on what goals you have is how you should save and put in different accounts.'),
          C('m6-l5-c11', 'C11', 'Short-term goals (under 1 year): keep in a regular or high-yield savings account · Medium-term goals (1–5 years): high-yield savings or CDs · Long-term goals (5+ years): investments.'),
          C('m6-l5-c12', 'C12', 'Even small amounts matter. $5/day is $1,825 a year. $25/week is $1,300 a year.'),
          C('m6-l5-c13', 'C13', 'People underestimate how quickly small consistent deposits add up.'),
          C('m6-l5-c14', 'C14', 'Especially with compound interest on top of that.'),
          C('m6-l5-c15', 'C15', 'The final smart saving trick we recommend is saving for sinking funds.'),
          C('m6-l5-c16', 'C16', "It's when you set aside a small amount each month because you know you have to spend money, you just don't know where."),
          C('m6-l5-c17', 'C17', "It could be your car registration, maybe you're visiting the dentist this month, holiday or birthday gifts."),
          C('m6-l5-c18', 'C18', 'These expenses are real and when the bill arrives, you want the money to be there already.'),
          TF('m6-l5-p2', 'P2', [
            { text: 'Automating savings transfers makes it easier to save consistently.', isTrue: true },
            { text: "You should wait until you're debt-free before starting to save.", isTrue: false },
            { text: 'Sinking funds help prepare for predictable irregular expenses.', isTrue: true },
          ]),
          SA('m6-l5-p3', 'P3', 'Smart saving strategies include:', [
            { label: 'Paying yourself first', isCorrect: true },
            { label: 'Saving only when you have leftover money at the end of the month', isCorrect: false },
            { label: 'Automating transfers to savings', isCorrect: true },
            { label: 'Building an emergency fund before other savings goals', isCorrect: true },
            { label: "Using a high-yield savings account for money you won't touch for 2+ years", isCorrect: true },
          ]),
        ],
      },
      {
        id: 'm6-l6',
        number: 6,
        title: 'Introduction to Investing',
        slides: [
          C('m6-l6-c1', 'C1', "Investing sounds intimidating. But at its core, it's simple: put money to work."),
          C('m6-l6-c2a', 'C2', "If the only money you earn is from hours you put in, it's hard to grow your wealth."),
          C('m6-l6-c2b', 'C2', 'Inflation is unstoppable. If you keep all your money in a low-interest account, inflation slowly takes its purchasing power.'),
          C('m6-l6-c3', 'C3', 'Purchasing power is how much you could buy with a certain amount. Everyone knows $20 today is not the same as $20 in 1970.'),
          C('m6-l6-c4', 'C4', 'Investing is how you stay ahead of inflation and keep your purchasing power.'),
          C('m6-l6-c5', 'C5', 'There are a couple of different ways to invest and so many unique strategies. This lesson just covers different places to put your money.'),
          C('m6-l6-c6', 'C6', 'Complete the investing lessons before pouring your hard-earned money into risky places.'),
          C('m6-l6-c7', 'C7', "The stock market: when you buy a stock, you're buying a small piece of a company."),
          C('m6-l6-c8', 'C8', "If the company does well, your piece becomes worth more. If it does poorly, it's worth less."),
          C('m6-l6-c9', 'C9', 'Over long periods of time, the overall market has historically grown.'),
          C('m6-l6-c10', 'C10', 'Index funds — one of the most recommended investments for beginners because of its low risk and good yield.'),
          C('m6-l6-c11', 'C11', 'Instead of picking individual stocks, an index fund automatically invests in hundreds or thousands of companies at once.'),
          C('m6-l6-c12', 'C12', 'It tracks an index like the S&P 500 (the 500 largest US companies).'),
          MC(
            'm6-l6-p1',
            'P1',
            'What is an index fund?',
            [
              "A single company's stock",
              'A fund that tracks a specific market index like the S&P 500',
              'A type of savings account',
              'A government bond',
            ],
            1
          ),
          C('m6-l6-c13', 'C13', 'ETFs (Exchange-Traded Funds) — similar to index funds but traded on stock exchanges like individual stocks.'),
          C('m6-l6-c14', 'C14', 'ETFs have low fees, are diversified, and beginner-friendly.'),
          C('m6-l6-c15', 'C15', 'Bonds — basically lending money to a government or corporation and earning interest.'),
          C('m6-l6-c16', 'C16', 'There is very little risk (less than stocks), but also lower return.'),
          C('m6-l6-c17', 'C17', "They're very good to balance a portfolio as you get closer to retirement."),
          C('m6-l6-c18', 'C18', 'Always remember risk and return are related. Higher potential return = higher potential risk.'),
          C('m6-l6-c19', 'C19', "Take into account when you'll want the money back before deciding where to put it."),
          C('m6-l6-c20', 'C20', "Some are good for short term while others are better in the long term. Time should be your teammate, especially while you're young."),
          SA('m6-l6-p2', 'P2', 'Which of the following are true about index funds?', [
            { label: 'They invest in one company at a time', isCorrect: false },
            { label: 'They track a market index like the S&P 500', isCorrect: true },
            { label: "They're a common recommendation for beginners", isCorrect: true },
            { label: 'They guarantee returns', isCorrect: false },
            { label: 'They tend to have lower fees than actively managed funds', isCorrect: true },
          ]),
          TF('m6-l6-p3', 'P3', [
            { text: 'Investing in the stock market guarantees you will earn money.', isTrue: false },
            { text: 'A longer time horizon helps reduce the impact of short-term market dips.', isTrue: true },
            { text: 'Bonds typically offer higher returns than stocks over the long term.', isTrue: false },
          ]),
          C('m6-l6-c21', 'C21', 'This is just an intro. For now, just know that investing in diversified, low-cost index funds is a critical part of building long-term wealth.'),
        ],
      },
    ],
  }),

  // =========================================================================
  // MODULE 7: IRL MONEY SKILLS
  // =========================================================================
  finalizeModule({
    id: 'mod-07-irl-money-skills',
    numberLabel: 'Module 07',
    title: 'IRL Money Skills',
    category: 'Real-World Tasks',
    duration: '5 Lessons',
    xpReward: 150,
    accentColor: 'violet',
    gradientClass: 'from-violet-500/25 via-indigo-500/10 to-slate-900',
    heroImage: mod07IrlSkillsImg,
    summary:
      'Everyday tasks nobody teaches in school: endorsing & mobile-depositing a check, setting up direct deposit with your routing & account number, reading a pay stub, spotting scams, and traveling internationally.',
    keySkills: ['Mobile Check Deposit', 'Routing vs. Account #', 'Reading Pay Stubs', 'Scam Defense'],
    lessons: [
      {
        id: 'm7-l1',
        number: 1,
        title: 'How to Cash or Deposit a Check',
        slides: [
          C('m7-l1-c1', 'C1', "Checks might seem old-fashioned, but they're still in use, sometimes. Yes, we're moving away from them, but yes it's also important to know about them."),
          C('m7-l1-c2', 'C2', "Tax refunds, graduation gifts, reimbursements — you'll likely receive checks throughout your life. Here's how to handle them."),
          C('m7-l1-c3', 'C3', 'Endorsing a check — before you deposit or cash a check, you need to sign the back. This is called endorsing.'),
          C('m7-l1-c4', 'C4', "If it's not endorsed, the check can't be processed."),
          C('m7-l1-c5', 'C5', "The fastest and most convenient way to deposit a check is mobile deposit. Just take a photo through your bank's app and upload it."),
          C('m7-l1-c6', 'C6', 'The other two ways are ATM deposit or a bank teller (the person at the bank window).'),
          C('m7-l1-c7a', 'C7', 'Funds usually become available after 1–2 business days for most checks. Larger checks or checks from out-of-state banks may take longer. Your bank will tell you the hold policy.'),
          MC(
            'm7-l1-p1',
            'P1',
            "What does it mean to 'endorse' a check?",
            [
              'Approve the check amount',
              'Sign the back of the check before depositing or cashing it',
              'Send the check back to the issuer',
              'Convert it to cash automatically',
            ],
            1
          ),
          C('m7-l1-c8', 'C8', "Lost or stolen check? Contact whoever sent it immediately. They'll need to cancel (stop payment on) the original and issue a new one. There may be a small fee for stop payments."),
          C('m7-l1-c7b', 'C9', "Personal checks — if you're ever given a blank check to write out: fill in the date, payee (who it's to), dollar amount in numbers AND written out in words, and sign it. Both the number and written amounts must match."),
          SA('m7-l1-p2', 'P2', 'Correct steps when depositing a check via mobile deposit:', [
            { label: 'Endorse (sign) the back', isCorrect: true },
            { label: "Write 'For Mobile Deposit Only'", isCorrect: true },
            { label: 'Fold the check to fit in the photo', isCorrect: false },
            { label: 'Ensure all four corners are visible in the photo', isCorrect: true },
            { label: 'Deposit checks at any ATM including out-of-network', isCorrect: false },
          ]),
        ],
      },
      {
        id: 'm7-l2',
        number: 2,
        title: 'Setting Up Direct Deposit',
        slides: [
          C('m7-l2-c1', 'C1', "Direct deposit is one of the simplest ways to make sure you actually get paid on time — directly into your bank account. Here's exactly how to set it up."),
          C('m7-l2-c2', 'C2', "To set up direct deposit, you need two pieces of information: your bank's routing number and your account number. Both are found at the bottom of a paper check, or in your bank's app under account details."),
          C('m7-l2-c3', 'C3', 'Routing number — a 9-digit number that identifies your bank. Every bank has its own. It tells the system which bank to send money to.'),
          C('m7-l2-c4', 'C4', "Account number — identifies your specific account. This is different from your debit card number. Never give your debit card number for direct deposit — that's not the same thing."),
          MC(
            'm7-l2-p1',
            'P1',
            'What two pieces of information are needed to set up direct deposit?',
            [
              'Debit card number and PIN',
              'Routing number and account number',
              'SSN and bank branch address',
              'Account username and password',
            ],
            1
          ),
          C('m7-l2-c5', 'C5', 'How to set it up: your employer will give you a direct deposit form (or have an online portal). Fill in your routing number, account number, and account type (checking or savings). Done.'),
          C('m7-l2-c6', 'C6', "Many employers have a setup period of 1–2 pay cycles before direct deposit kicks in. Your first paycheck might still be a paper check or pay card. Don't panic."),
          C('m7-l2-c7', 'C7', "You can usually split direct deposit between multiple accounts — for example, $200 goes directly to savings and the rest goes to checking. A very easy way to automate the 'pay yourself first' habit."),
          TF('m7-l2-p2', 'P2', [
            { text: 'Your debit card number is the same as your account number.', isTrue: false },
            { text: 'You can split direct deposit between a checking and savings account.', isTrue: true },
            { text: 'A routing number identifies your specific personal account.', isTrue: false },
          ]),
          SA('m7-l2-p3', 'P3', 'What can you find on a paper check?', [
            { label: 'Your routing number', isCorrect: true },
            { label: 'Your PIN', isCorrect: false },
            { label: 'Your account number', isCorrect: true },
            { label: 'Your credit score', isCorrect: false },
            { label: "Your bank's name", isCorrect: true },
          ]),
        ],
      },
      {
        id: 'm7-l3',
        number: 3,
        title: 'Reading a Pay Stub',
        slides: [
          C('m7-l3-c1', 'C1', "Your first paycheck might be confusing. The number you were offered and the number deposited are often very different. That's because of deductions. Your pay stub explains exactly what happened to your money."),
          C('m7-l3-c2', 'C2', "Gross pay — what you earned before any deductions. If you're paid $15/hour and worked 40 hours, gross pay is $600."),
          C('m7-l3-c3', 'C3', 'Net pay (take-home pay) — what actually hits your bank account after all deductions. This is the number you should base your budget on.'),
          C('m7-l3-c4', 'C4', "Common deductions you'll see: Federal income tax · State income tax (if applicable) · Social Security tax (6.2%) · Medicare tax (1.45%) · Health insurance (if enrolled) · 401k contribution (if enrolled)."),
          MC(
            'm7-l3-p1',
            'P1',
            'If your gross pay is $800 and your total deductions are $175, what is your net pay?',
            ['$975', '$175', '$625', '$800'],
            2
          ),
          C('m7-l3-c5', 'C5', "Year-to-date (YTD) — your pay stub usually shows YTD totals for both earnings and deductions. This tracks how much you've earned and paid so far in the current year — useful for tax purposes."),
          C('m7-l3-c6', 'C6', 'Some deductions are pre-tax (taken before income tax is calculated — like 401k contributions and health insurance), which actually lowers your taxable income. Others are post-tax. Your pay stub shows both.'),
          C('m7-l3-c7', 'C7', 'Always review your pay stub when you get a new job or when something changes (new benefits, raise, etc.). Errors happen — and catching them is your responsibility.'),
          SA('m7-l3-p2', 'P2', 'Which of the following are typically shown on a pay stub?', [
            { label: 'Gross pay', isCorrect: true },
            { label: 'Net pay', isCorrect: true },
            { label: 'Credit score', isCorrect: false },
            { label: 'Social Security tax withheld', isCorrect: true },
            { label: 'Year-to-date earnings', isCorrect: true },
            { label: 'Bank account balance', isCorrect: false },
          ]),
          TF('m7-l3-p3', 'P3', [
            { text: 'Net pay is always higher than gross pay.', isTrue: false },
            { text: 'Pre-tax deductions reduce your taxable income.', isTrue: true },
            { text: 'You should review your pay stub when you start a new job.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm7-l4',
        number: 4,
        title: 'Protecting Yourself from Scams & Fraud',
        slides: [
          C('m7-l4-c1', 'C1', "Financial fraud is one of the fastest-growing crimes — and young adults are a common target. Not because you're naive, but because scammers know you're just starting to build financial accounts and might not recognize the warning signs."),
          C('m7-l4-c2', 'C2', 'Common scams to know: Phishing — fake emails or texts pretending to be your bank, asking you to click a link and enter your info. Your bank will NEVER ask for your password via email · Impersonation — someone calls claiming to be the IRS, a bank, or a government agency threatening immediate action.'),
          C('m7-l4-c3', 'C3', "More scams: Job offer scams — fake job offers that ask you to deposit a check and send some money back (the check bounces later, and you're on the hook) · 'You won a prize' scams — you have to pay a fee to claim it. Legit prizes never require you to pay first."),
          C('m7-l4-c4', 'C4', 'Romance scams — someone builds a relationship online then eventually asks for money. These are emotionally manipulative and increasingly common, especially in younger age groups.'),
          MC(
            'm7-l4-p1',
            'P1',
            'Your bank sends you a text message with a link asking you to verify your account immediately. What should you do?',
            [
              'Click the link and enter your info',
              'Ignore it and do nothing',
              'Call your bank directly using the number on the back of your card to verify',
              'Reply to the text with your account info',
            ],
            2
          ),
          C('m7-l4-c5', 'C5', "Red flags of a scam: Urgency — 'you must act NOW or your account will be closed' · Unusual payment requests — gift cards, wire transfers, cryptocurrency · Too good to be true — guaranteed job, free money, unbelievable prizes · Request for personal info via text or email."),
          C('m7-l4-c6', 'C6', "Protecting your accounts: Never share passwords or PINs · Use strong, unique passwords for banking apps · Enable two-factor authentication (2FA) · Monitor your accounts regularly for unfamiliar transactions · Freeze your credit if you suspect identity theft (it's free)."),
          C('m7-l4-c7', 'C7', "If you're scammed: act fast. Contact your bank immediately, freeze your cards, change your passwords, and report it to the FTC at reportfraud.ftc.gov. The sooner you act, the better your chances of recovering money."),
          SA('m7-l4-p2', 'P2', 'Red flags that something might be a scam:', [
            { label: 'Urgency to act immediately', isCorrect: true },
            { label: 'Asking for payment in gift cards', isCorrect: true },
            { label: 'A bank asking for your PIN over email', isCorrect: true },
            { label: 'A job that requires a degree', isCorrect: false },
            { label: 'Too-good-to-be-true promises', isCorrect: true },
          ]),
          TF('m7-l4-p3', 'P3', [
            { text: 'Your bank will never ask for your password via email or text.', isTrue: true },
            { text: "If you receive a suspicious call from 'the IRS,' you should give them your SSN to verify.", isTrue: false },
            { text: 'Freezing your credit is a free way to protect yourself from identity theft.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm7-l5',
        number: 5,
        title: 'Traveling to Another Country',
        slides: [
          C('m7-l5-c1', 'C1', 'Heading out of the country for vacation or study abroad? A few quick money moves before you fly will save you from frozen cards and sneaky fees.'),
          C('m7-l5-c2', 'C2', 'Watch out for Foreign Transaction Fees (FTF): many standard cards and debit cards tack on an extra 3% fee to every single swipe outside the US.'),
          C('m7-l5-c3', 'C3', 'Pack a $0 foreign transaction fee card (like Capital One SavorOne or Bilt) and a travel-friendly debit card (like Capital One 360 or Charles Schwab) so you keep that 3%.'),
          C('m7-l5-c4', 'C4', 'When a payment terminal abroad asks if you want to pay in "US Dollars" or "Local Currency" (like Euros, Pesos, or Yen), ALWAYS choose Local Currency so the merchant doesn\'t hit you with a terrible exchange rate.'),
          MC(
            'm7-l5-p1',
            'P1',
            'When paying with a $0 foreign-fee card in another country, which currency should you select on the payment terminal?',
            [
              'Always choose Local Currency so your card network gives you the real exchange rate',
              'Always choose US Dollars so the terminal converts it with a markup',
              'It makes no difference',
            ],
            0
          ),
        ],
      },
    ],
  }),

  // =========================================================================
  // MODULE 8: GETTING OUT OF DEBT
  // =========================================================================
  finalizeModule({
    id: 'mod-08-getting-out-of-debt',
    numberLabel: 'Module 08',
    title: 'Getting Out of Debt',
    category: 'Debt Payoff Plan',
    duration: '5 Lessons',
    xpReward: 150,
    accentColor: 'amber',
    gradientClass: 'from-rose-500/25 via-amber-500/10 to-slate-900',
    heroImage: mod09DebtImg,
    summary:
      'A clear, step-by-step mindset and game plan for tackling debt: getting your head in the right place, understanding how debt builds, changing spending habits, and using the Avalanche or Snowball payoff method.',
    keySkills: ['Debt Mindset', 'Stopping New Debt', 'Debt Avalanche vs. Snowball', 'Staying Debt-Free'],
    lessons: [
      {
        id: 'm8-l1',
        number: 1,
        title: "Don't Worry",
        slides: [
          C('m8-l1-c1', 'C1', "Seriously, don't worry. It happens and the fact that you are here is an important first step."),
          C('m8-l1-c2', 'C2', "Don't worry doesn't mean to ignore it. It is important to address your debt."),
          C('m8-l1-c4', 'C3', 'It may be a difficult process but start now. No debt is insurmountable.'),
          C('m8-l1-c5', 'C4', 'Just like everything, you need your mind to be in the right place.'),
          C('m8-l1-c6', 'C5', "Sink or swim? Yea we're choosing to swim."),
          C('m8-l1-c7', 'C6', "We don't know everyone's exact circumstances, or how the debt started."),
          C('m8-l1-c8', 'C7', 'It could be credit card misuse, student loans, or life just lifing (yes we made that word up).'),
          C('m8-l1-c9', 'C8', 'Our goal to help you is to first make sure your mind is ready, because we know it can take a toll on people.'),
          C('m8-l1-c10', 'C9', 'Then we have to understand what traps are out there in the financial world and which habits commonly build debt.'),
          C('m8-l1-c11', 'C10', 'After that we can offer advice on steps to change the habits and a game plan to do that.'),
          C('m8-l1-c12', 'C11', 'This will be general advice. While it will be helpful, look for financial advisors for personalized coaching on your exact situation. They can also help keep you accountable.'),
          TF('m8-l1-p1', 'P1', [
            { text: "Not worrying about debt means ignoring it and hoping it disappears.", isTrue: false },
            { text: 'No debt is insurmountable when you face it with a clear plan.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm8-l2',
        number: 2,
        title: 'Understand What Got You There',
        slides: [
          C('m8-l2-c1', 'C1', 'Before you can fix debt, you have to get crystal clear on what caused it — without beating yourself up.'),
          C('m8-l2-c2', 'C2', 'Step one is writing down every single balance you owe, the interest rate (APR) on each one, and the minimum monthly payment.'),
          C('m8-l2-c3', 'C3', 'High-APR credit card debt (20%–30% APR) grows every single day, while only paying the minimum goes mostly toward interest instead of your actual balance.'),
          C('m8-l2-c4', 'C4', 'Once you see the exact numbers in one list, the mystery disappears and you can attack the problem systematically.'),
          MC(
            'm8-l2-p1',
            'P1',
            'What is the first practical step to understanding your debt?',
            [
              'Delete your banking apps so you do not have to see the balance',
              'List every balance you owe along with its APR and minimum payment',
              'Open a new credit card to pay the minimum on the old one',
            ],
            1
          ),
        ],
      },
      {
        id: 'm8-l3',
        number: 3,
        title: 'Change the Habits',
        slides: [
          C('m8-l3-c1', 'C1', "You can't bail water out of a boat if there's still a hole in the bottom."),
          C('m8-l3-c2', 'C2', 'While paying off credit card debt, stop putting new purchases on cards that are carrying a balance — remember, new swipes on a card with a balance get charged interest immediately!'),
          C('m8-l3-c3', 'C3', 'Switch daily spending to debit or cash, audit your recurring subscriptions, and pause impulse buys with the 24-hour rule.'),
          C('m8-l3-c4', 'C4', 'Every dollar you free up from subscriptions or impulse takeout becomes extra fuel to knock out your debt faster.'),
          TF('m8-l3-p1', 'P1', [
            { text: 'When a credit card already carries a balance, new purchases on that card start accruing interest immediately.', isTrue: true },
            { text: 'Cutting unused subscriptions frees up extra cash to pay down principal faster.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm8-l4',
        number: 4,
        title: 'Game Plan Part 1 (Avalanche vs. Snowball)',
        slides: [
          C('m8-l4-c1', 'C1', 'Always pay the minimum on EVERY debt first so you never get hit with late fees or credit score damage.'),
          C('m8-l4-c2', 'C2', 'Then put all your extra payoff money toward ONE target debt using either the Debt Avalanche or the Debt Snowball.'),
          C('m8-l4-c3', 'C3', 'Debt Avalanche: target the debt with the HIGHEST interest rate (APR) first. Mathematically, this saves you the most money in interest.'),
          C('m8-l4-c4', 'C4', 'Debt Snowball: target the SMALLEST dollar balance first. Knocking out a whole account fast gives you a quick psychological win to stay motivated.'),
          MC(
            'm8-l4-p1',
            'P1',
            'Which debt payoff method saves you the most money in total interest?',
            [
              'Debt Avalanche (attacking the highest APR first)',
              'Debt Snowball (attacking the smallest balance first)',
              'Paying only the minimum on every card forever',
            ],
            0
          ),
        ],
      },
      {
        id: 'm8-l5',
        number: 5,
        title: 'Game Plan Part 2 (Staying Debt-Free)',
        slides: [
          C('m8-l5-c1', 'C1', 'When your first target debt hits $0, roll that entire monthly payment into the next debt on your list — your payoff speed snowballs!'),
          C('m8-l5-c2', 'C2', 'If your credit is still solid, a 0% Intro APR balance transfer card or calling your bank to ask for a lower APR can stop interest from working against you while you pay it down.'),
          C('m8-l5-c3', 'C3', 'Once you hit $0 high-interest debt, redirect those monthly payments straight into your High-Yield Savings emergency fund so an unexpected bill never forces you back into debt.'),
          SA('m8-l5-p1', 'P1', 'Select all smart moves for finishing and staying out of debt:', [
            { label: 'Rolling the payment from a paid-off debt into the next debt on your list', isCorrect: true },
            { label: 'Building an emergency fund once high-APR debt is gone', isCorrect: true },
            { label: 'Immediately maxing out your cards again to celebrate', isCorrect: false },
          ]),
        ],
      },
    ],
  }),

  // =========================================================================
  // MODULE 9: HOW BANKS WORK
  // =========================================================================
  finalizeModule({
    id: 'mod-09-how-banks-work',
    numberLabel: 'Module 09',
    title: 'How Banks Work',
    category: 'Banking Inside Out',
    duration: '7 Lessons',
    xpReward: 150,
    accentColor: 'emerald',
    gradientClass: 'from-blue-500/25 via-cyan-500/10 to-slate-900',
    heroImage: mod08BanksImg,
    summary:
      'Understand the institutions behind your accounts: in-person vs. digital banks, member-owned credit unions, robo-advisors, how banks make money on net interest margin, how loans work, and fractional reserve banking & FDIC insurance.',
    keySkills: ['In-Person vs. Digital', 'Credit Unions', 'Net Interest Margin', 'FDIC & NCUA'],
    lessons: [
      {
        id: 'm9-l1',
        number: 1,
        title: 'In-Person vs. Digital Banks',
        slides: [
          C('m9-l1-c1', 'C1', "When it comes to picking a place to keep your cash, most people just go with whatever bank their parents use or whichever one has a branch closest to campus. It's easy, it's familiar, and it gets the job done. But banking has changed a lot recently, and you actually have two very different flavors of banks to choose from: traditional in-person banks and online-only digital banks."),
          C('m9-l1-c2a', 'C2', 'Traditional banks are the ones you see on the street corner with physical brick-and-mortar buildings and local ATMs (think Chase, Bank of America, or Wells Fargo).'),
          C('m9-l1-c2b', 'C2', 'The Big Advantage of Traditional Banks: They offer face-to-face customer service. If your account gets locked or you have a weird fee issue, you can walk in and talk to a real human. They also make it incredibly easy to deposit physical cash from a summer job or a side hustle.'),
          C('m9-l1-c2c', 'C2', 'The Downside of Traditional Banks: Running hundreds of physical buildings with electricity, tellers, and vault security is incredibly expensive. To pay for all that overhead, traditional banks typically offer near-zero interest rates on your savings, and they love to sneak in monthly maintenance fees if your balance dips too low.'),
          C('m9-l1-c3a', 'C3', 'On the flip side, you have digital banks (like Ally or Capital One). These are modern banks that operate online — low or no branch overhead.'),
          C('m9-l1-c3b', 'C3', "The Big Advantage of Digital Banks: Because they don't have to pay rent on hundreds of retail buildings, they pass those savings directly to you. Digital banks rarely charge monthly fees, and they offer interest rates on your savings that are often 10 to 20 times higher than a traditional bank."),
          C('m9-l1-c3c', 'C3', "The Downside of Digital Banks: If you prefer talking to someone face-to-face, everything is handled via an app or phone call, and depositing physical cash into an online-only account can be tougher."),
          C('m9-l1-c4', 'C4', "So, when do you use what? It doesn't have to be an all-or-nothing choice. A lot of students use a traditional bank for their everyday checking account (for easy ATM access and cash deposits) but move their emergency fund or long-term savings over to a digital bank to let that high interest rate quietly build extra cash."),
          MC(
            'm9-l1-p1',
            'P1',
            'Why do digital banks usually offer much higher interest rates on savings accounts compared to traditional banks?',
            [
              'They are run by the government.',
              "They don't have the high overhead costs of maintaining physical buildings, so they pass the savings to you.",
              'They charge you a fee every time you log into the app.',
              'They only allow you to withdraw money once a year.',
            ],
            1
          ),
          TF('m9-l1-p2', 'P2', [
            { text: 'Traditional banks are usually best if you regularly need to deposit physical cash or want to talk to a human in person.', isTrue: true },
            { text: 'You are forced to choose only one bank and cannot split your money between traditional and digital accounts.', isTrue: false },
            { text: 'Digital banks generally charge more monthly maintenance fees than traditional banks.', isTrue: false },
          ]),
        ],
      },
      {
        id: 'm9-l2',
        number: 2,
        title: 'The Credit Union Alternative',
        slides: [
          C('m9-l2-c1', 'C1', "Now that you know the difference between standard banks, let's talk about an alternative that a lot of people overlook simply because they don't know what it is: the Credit Union."),
          C('m9-l2-c2', 'C2', 'At first glance, a credit union looks and acts exactly like a normal bank. They have physical branches, debit cards, checking accounts, and mobile apps. But under the hood, the business model is completely inverted: regular banks are privately owned, for-profit businesses, while credit unions are nonprofits that are entirely owned by their members.'),
          C('m9-l2-c3a', 'C3', "When you open an account at a credit union, you aren't just a number on a spreadsheet — you are legally a member and a part-owner. Any extra money they make goes right back into the institution."),
          C('m9-l2-c3b', 'C3', 'The Big Advantage: Because of their nonprofit setup, credit unions are famous for having great customer service, fewer random fees, and much lower interest rates when you need to take out a loan (like a car loan or a student loan).'),
          C('m9-l2-c3c', 'C3', "The Downside: They are usually hyper-local with a smaller geographic footprint and smaller ATM networks if you travel out of state, plus you usually have to meet eligibility rules (like living in a certain county or attending a specific university)."),
          C('m9-l2-c4', 'C4', "Think of a credit union as your local, community-focused option. If you're looking to buy a car in the near future or just want a financial institution that feels a bit more personal and less corporate, checking out a local credit union is a fantastic move."),
          MC(
            'm9-l2-p1',
            'P1',
            'What is the core structural difference between a standard bank and a credit union?',
            [
              'Standard banks are online-only, while credit unions only use physical paper.',
              'Credit unions are member-owned nonprofits, while standard banks are for-profit businesses.',
              'Credit unions do not offer debit cards to students.',
              'Standard banks are free, while credit unions charge a high fee to open an account.',
            ],
            1
          ),
          SA('m9-l2-p2', 'P2', 'Which of the following are true about credit unions?', [
            { label: 'They are run as for-profit corporations', isCorrect: false },
            { label: 'They often offer lower interest rates on car or student loans', isCorrect: true },
            { label: 'Anyone in the world can join any credit union without restrictions', isCorrect: false },
            { label: 'They tend to have smaller physical branch networks than massive national banks', isCorrect: true },
          ]),
        ],
      },
      {
        id: 'm9-l3',
        number: 3,
        title: 'Entering the Robo-Advisor',
        slides: [
          C('m9-l3-c1', 'C1', "Traditional banks, digital banks, and credit unions all have one job: they are places to store your cash safely so you can pay your bills, use an ATM, and keep your money protected. But what happens when you've saved up some money, built an emergency fund, and want to start actually growing your wealth for the future? That's where you step out of the banking world and into the investing world."),
          C('m9-l3-c2', 'C2', 'For a long time, investing in the stock market meant you either had to spend hours researching companies yourself or pay a massive fee to hire a human financial advisor. Enter the robo-advisor.'),
          C('m9-l3-c3a', 'C3', "A robo-advisor is an automated, digital service that uses computer algorithms to build and manage an investment portfolio for you (think of platforms like Betterment or Wealthfront). Instead of you picking individual stocks, the app asks you a few simple questions about your goals, your timeline, and how much risk you're comfortable with, then automatically spreads your money across a diversified mix of low-cost investments."),
          C('m9-l3-c3b', 'C3', 'The Big Advantage: It is completely hands-off. The software automatically handles rebalancing your portfolio when the market shifts, fees are very low, and you can start investing with just a few dollars.'),
          C('m9-l3-c3c', 'C3', "The Downside: This is not a bank account. Your money is invested in the stock market, meaning it is not FDIC insured and its value will fluctuate."),
          C('m9-l3-c4', 'C4', "The golden rule here is simple: if you need your money within the next year or two for rent, books, or an emergency, keep it safe in a bank or credit union. But if you have cash you won't need for 3+ years and want to start building long-term wealth without having to become a stock market expert overnight, a robo-advisor is a great starter tool."),
          MC(
            'm9-l3-p1',
            'P1',
            'When is the most appropriate time to use a robo-advisor?',
            [
              'When you need a safe checking account to pay your monthly utilities.',
              'When you want to invest money for long-term goals and let software automate the portfolio management.',
              'When you need to withdraw cash from an ATM on campus.',
              'When you want to guarantee your money will never lose value.',
            ],
            1
          ),
          TF('m9-l3-p2', 'P2', [
            { text: 'Money kept in a robo-advisor account is FDIC insured just like a standard bank account.', isTrue: false },
            { text: "Robo-advisors are hands-off tools that don't require you to manually trade stocks.", isTrue: true },
            { text: 'You should use a robo-advisor to store your short-term emergency fund cash.', isTrue: false },
          ]),
        ],
      },
      {
        id: 'm9-l4',
        number: 4,
        title: 'Banks Are Businesses',
        slides: [
          C('m9-l4-c1', 'C1', "Let's clear something up right away: banks are not a public service. They are privately owned, for-profit businesses. Just like a restaurant or a clothing store, their goal is to make money."),
          C('m9-l4-c2', 'C2', "That doesn't make them evil — but it does mean they have financial interests that are separate from yours. Understanding that changes how you interact with them."),
          C('m9-l4-c3', 'C3', 'Banks make money in several ways: charging fees, earning interest on loans, and investing. Every product a bank offers — checking accounts, savings accounts, credit cards, mortgages — is designed with profitability in mind.'),
          C('m9-l4-c4', 'C4', "That's not a reason to avoid banks. They provide an essential service and your deposits are protected by FDIC insurance. But knowing they're a business helps you read the fine print, avoid unnecessary fees, and shop around for better terms."),
          MC(
            'm9-l4-p1',
            'P1',
            'What type of organization is a standard bank?',
            [
              'A government agency',
              'A nonprofit',
              'A privately owned, for-profit business',
              'A community cooperative',
            ],
            2
          ),
          C('m9-l4-c5', 'C5', 'Types of banking institutions: Commercial banks — the large national or regional banks most people use (Chase, Bank of America, Wells Fargo, etc.) · Credit unions — member-owned, nonprofit institutions that often offer lower fees and better rates · Online banks — no physical branches, lower overhead, often pass savings to customers through higher APYs and fewer fees.'),
          C('m9-l4-c6', 'C6', "Credit unions deserve a special mention. Because they're nonprofit and owned by their members (you're both a customer and a part-owner), their goal is to serve members rather than maximize profit. They often have better savings rates and lower loan rates than traditional banks."),
          C('m9-l4-c7', 'C7', "The bottom line: you are a customer, and customers have choices. Don't feel locked in to one bank. If another bank offers better rates, fewer fees, or a better app — you can switch. Banks compete for your business."),
          SA('m9-l4-p2', 'P2', 'Which of the following are true about banks?', [
            { label: 'They are privately owned businesses', isCorrect: true },
            { label: 'Their deposits are FDIC insured', isCorrect: true },
            { label: 'Their primary goal is to serve the public as a charity', isCorrect: false },
            { label: 'They compete with each other for customers', isCorrect: true },
            { label: 'Credit unions are a nonprofit alternative to banks', isCorrect: true },
          ]),
          TF('m9-l4-p3', 'P3', [
            { text: 'Banks are government-run institutions.', isTrue: false },
            { text: 'Credit unions are member-owned and tend to offer better rates than traditional banks.', isTrue: true },
            { text: 'You are free to switch banks if you find a better option.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm9-l5',
        number: 5,
        title: 'How Banks Make Money',
        slides: [
          C('m9-l5-c1', 'C1', "So if banks are businesses, how do they actually make money? The answer is mostly: by using your money. When you deposit funds, the bank doesn't just let that money sit in a vault."),
          C('m9-l5-c2', 'C2', "Banks take the money deposited by customers and lend it out to other customers as loans — mortgages, car loans, personal loans, credit cards. The bank charges borrowers interest on those loans. That interest is the bank's primary revenue."),
          C('m9-l5-c3', 'C3', "Here's the key dynamic: the bank pays you a small interest rate on your savings (say 0.5%), then turns around and lends that money out at a much higher rate (say 7% on a car loan). The difference — called the net interest margin — is profit."),
          C('m9-l5-c4', 'C4', "This is why banks can offer you a 'free' checking account. It's not really free — you're giving them access to your money, which they lend out at a profit. The account itself is a tool to hold your deposits."),
          MC(
            'm9-l5-p1',
            'P1',
            'What is the main way banks generate revenue?',
            [
              'Charging ATM fees',
              'Selling financial products to other companies',
              'Collecting interest on loans they give out',
              "Investing customers' money in the stock market",
            ],
            2
          ),
          C('m9-l5-c5', 'C5', "Banks also make money through fees — overdraft fees, monthly maintenance fees, wire transfer fees, foreign transaction fees, and more. For customers who don't know better, these add up fast. That's why we covered them early."),
          C('m9-l5-c6', 'C6', 'A third revenue stream is investments. Banks invest a portion of their holdings in government bonds and other low-risk assets to generate additional returns. This is tightly regulated to prevent banks from taking on too much risk.'),
          C('m9-l5-c7', 'C7', "Understanding this system explains a lot: why checking accounts earn almost no interest (the bank is already profiting from your deposits), why savings rates are low at traditional banks (they don't need to pay you much), and why loan rates are higher (that's where the real money is)."),
          TF('m9-l5-p2', 'P2', [
            { text: 'When you deposit money in a bank, the bank stores it untouched in a vault.', isTrue: false },
            { text: 'The difference between the rate banks pay on savings and charge on loans is a source of profit.', isTrue: true },
            { text: 'Bank fees are another way banks generate revenue.', isTrue: true },
          ]),
          MC(
            'm9-l5-p3',
            'P3',
            'A bank pays 0.5% APY on savings and charges 8% on car loans. What is the approximate net interest margin?',
            ['0.5%', '8%', '7.5%', '8.5%'],
            2
          ),
        ],
      },
      {
        id: 'm9-l6',
        number: 6,
        title: 'How Loans Work',
        slides: [
          C('m9-l6-c1', 'C1', 'Loans are the core product of a bank. Understanding how they work helps you borrow smarter — and avoid costly mistakes.'),
          C('m9-l6-c2', 'C2', "When a bank gives you a loan, you receive a lump sum upfront and agree to pay it back over a set period of time, plus interest. The interest is the bank's compensation for the risk of lending to you."),
          C('m9-l6-c3', 'C3', "The interest rate you receive is not random — it's based largely on your credit score. Higher credit score = lower risk for the bank = lower interest rate for you. Lower score = more risk = higher rate. This is why building credit matters."),
          C('m9-l6-c4', 'C4', 'Common types of loans: Mortgage — used to buy a home, typically 15–30 years · Auto loan — used to buy a car, typically 3–7 years · Personal loan — general purpose, 1–7 years · Student loan — used to fund education · Credit card — a revolving line of credit with no fixed term.'),
          MC(
            'm9-l6-p1',
            'P1',
            'What largely determines the interest rate a bank offers you on a loan?',
            [
              "How long you've had a bank account",
              'Your credit score',
              'How much money you have in savings',
              'Which state you live in',
            ],
            1
          ),
          C('m9-l6-c5', 'C5', 'Two key loan terms: Principal — the original amount borrowed · Interest — the cost charged for borrowing. Each monthly payment goes toward both. Early in a loan, most of your payment goes to interest. Over time, more goes toward principal.'),
          C('m9-l6-c6', 'C6', 'Collateral — some loans require you to put up an asset as security. A mortgage uses the house; an auto loan uses the car. If you stop making payments, the bank can take the asset. Loans with collateral = secured. Loans without = unsecured.'),
          C('m9-l6-c7', 'C7', 'The golden rule of borrowing: only take on debt for things worth the total cost — including interest. A $20,000 car loan at 8% over 5 years actually costs you more than $24,000 total. Always calculate the real cost.'),
          SA('m9-l6-p2', 'P2', 'Which of the following are true about loans?', [
            { label: 'You pay back the original amount plus interest', isCorrect: true },
            { label: 'Your credit score affects the interest rate you receive', isCorrect: true },
            { label: 'All loans require collateral', isCorrect: false },
            { label: 'A mortgage uses the home as collateral', isCorrect: true },
            { label: 'Early loan payments go mostly toward principal', isCorrect: false },
          ]),
          TF('m9-l6-p3', 'P3', [
            { text: 'Principal is the interest charged on a loan.', isTrue: false },
            { text: 'Secured loans require an asset as collateral.', isTrue: true },
            { text: 'A higher credit score generally results in a lower interest rate on a loan.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm9-l7',
        number: 7,
        title: 'Fractional Reserve Banking & FDIC Insurance',
        slides: [
          C('m9-l7-c1', 'C1', "Here's something that surprises a lot of people: banks don't actually keep all your money on hand. When you deposit $1,000, the bank might only keep $100 available and lend out the rest. This is called fractional reserve banking."),
          C('m9-l7-c2', 'C2', 'It sounds risky — and historically, it was. Before federal deposit insurance existed, bank runs were a real threat: if too many customers tried to withdraw at once, a bank could collapse and depositors could lose everything.'),
          C('m9-l7-c3', 'C3', "That's why the FDIC (Federal Deposit Insurance Corporation) was created in 1933. It guarantees that even if a bank fails, your deposits are protected up to $250,000 per depositor, per bank, per account category."),
          C('m9-l7-c4', 'C4', 'This means: if your bank goes under tomorrow, the government ensures you get your money back — up to $250,000. For the vast majority of people, your deposits are completely safe.'),
          MC(
            'm9-l7-p1',
            'P1',
            'What is the purpose of FDIC insurance?',
            [
              'To help banks earn higher profits',
              'To protect depositors if a bank fails',
              'To set interest rates for savings accounts',
              'To regulate how banks advertise',
            ],
            1
          ),
          C('m9-l7-c5', 'C5', 'If you have more than $250,000 in deposits, you can spread funds across multiple banks or account types to stay within the insured limit at each.'),
          C('m9-l7-c6', 'C6', 'Credit unions have their own equivalent: NCUA insurance (National Credit Union Administration), which provides the same $250,000 protection for credit union members.'),
          C('m9-l7-c7', 'C7', "The big takeaway: the US banking system has strong protections built in. You don't need to worry about losing your deposits in a regular bank or credit union. The risks worth focusing on — high fees, unfavorable loan rates — are the ones you can control."),
          TF('m9-l7-p2', 'P2', [
            { text: 'Banks keep 100% of your deposited funds in reserve at all times.', isTrue: false },
            { text: 'FDIC insurance protects up to $250,000 per depositor per bank.', isTrue: true },
            { text: 'Credit unions use NCUA insurance instead of FDIC.', isTrue: true },
          ]),
          SA('m9-l7-p3', 'P3', 'Which of the following are true about FDIC insurance?', [
            { label: 'It protects deposits up to $250,000', isCorrect: true },
            { label: 'It was created to prevent depositors from losing money if a bank fails', isCorrect: true },
            { label: 'It covers investment accounts like Roth IRAs', isCorrect: false },
            { label: 'Spreading deposits across multiple banks can extend your coverage', isCorrect: true },
            { label: 'Credit unions use the exact same FDIC agency as commercial banks', isCorrect: false },
          ]),
        ],
      },
    ],
  }),

  // =========================================================================
  // MODULE 10: FINANCIAL SERVICES — WHAT'S OUT THERE
  // =========================================================================
  finalizeModule({
    id: 'mod-10-financial-services',
    numberLabel: 'Module 10',
    title: "Financial Services — What's Out There",
    category: 'Financial Toolkit',
    duration: '5 Lessons',
    xpReward: 150,
    accentColor: 'violet',
    gradientClass: 'from-violet-500/25 via-emerald-500/10 to-slate-900',
    heroImage: mod10InvestingImg,
    summary:
      'A map of the financial tools available beyond a basic bank account: money management & budgeting apps, subscription & bill trackers, credit monitoring & identity protection, brokerages & robo-advisors, and renters/auto/health insurance.',
    keySkills: ['Budgeting Apps', 'Subscription Trackers', 'Credit Monitoring', 'Brokerages & Insurance'],
    lessons: [
      {
        id: 'm10-l1',
        number: 1,
        title: 'Money Management & Budgeting Tools',
        slides: [
          C('m10-l1-c1', 'C1', "Beyond your bank account, there's an entire ecosystem of financial tools and services designed to help you manage, track, grow, and protect your money. This module is your map."),
          C('m10-l1-c2', 'C2', 'The first category: money management and budgeting apps. These tools connect to your bank accounts and credit cards to automatically track where your money goes. They categorize spending, flag unusual charges, and show your full financial picture in one place.'),
          C('m10-l1-c3', 'C3', "What they do: Track all your spending automatically across accounts · Organize expenses into categories (food, transport, subscriptions, etc.) · Alert you when you're approaching budget limits · Show month-over-month trends in your spending habits."),
          C('m10-l1-c4', 'C4', 'These tools are especially powerful for people with multiple accounts or cards who struggle to see the full picture. Instead of logging into three different apps, everything is in one dashboard.'),
          MC(
            'm10-l1-p1',
            'P1',
            'What is the primary function of a budgeting app?',
            [
              'To invest your money automatically',
              'To track and categorize your spending across accounts',
              'To replace your bank account',
              'To negotiate lower prices on your bills',
            ],
            1
          ),
          C('m10-l1-c5', 'C5', 'Some budgeting tools also offer net worth tracking — linking your accounts, loans, and investments so you can see your total financial position at any time. Watching your net worth grow over months and years is one of the most motivating things in personal finance.'),
          SA('m10-l1-p2', 'P2', 'What can a budgeting app typically do?', [
            { label: 'Automatically categorize your spending', isCorrect: true },
            { label: 'Guarantee your investments will grow', isCorrect: false },
            { label: "Alert you when you're over budget", isCorrect: true },
            { label: 'Show spending trends over time', isCorrect: true },
            { label: 'Replace the need to have a bank account', isCorrect: false },
          ]),
        ],
      },
      {
        id: 'm10-l2',
        number: 2,
        title: 'Subscription & Bill Tracking Services',
        slides: [
          C('m10-l2-c1', 'C1', "Here's a problem most people don't realize they have: subscription creep. Small recurring charges slowly pile up — a streaming service here, a cloud storage plan there, an app you forgot you downloaded — until you're spending $150/month on things you barely use."),
          C('m10-l2-c2', 'C2', 'Subscription tracking services solve this by scanning your bank and card transactions to identify every recurring charge. They surface subscriptions you may have forgotten about and show you the true monthly total.'),
          C('m10-l2-c3', 'C3', 'What they do: Detect all recurring charges across your accounts · Notify you before a free trial converts to a paid subscription · Show the full monthly cost of all your subscriptions combined · Some can even negotiate or cancel subscriptions on your behalf.'),
          C('m10-l2-c4', 'C4', 'This type of service is genuinely eye-opening for most people. The average person significantly underestimates their monthly subscriptions. Seeing them all listed in one place often prompts immediate cancellations.'),
          MC(
            'm10-l2-p1',
            'P1',
            "What is 'subscription creep'?",
            [
              'When a subscription service increases its price',
              "When small recurring charges quietly accumulate until you're overspending",
              'When a company automatically renews your contract',
              'When your bank charges a monthly maintenance fee',
            ],
            1
          ),
          C('m10-l2-c5', 'C5', 'Bill negotiation services are a related category. These contact your providers — internet, phone, cable — on your behalf to negotiate lower rates. They typically take a percentage of whatever they save you as their fee.'),
          TF('m10-l2-p2', 'P2', [
            { text: 'Subscription tracking services can help you identify charges you forgot about.', isTrue: true },
            { text: 'The average person usually knows the exact dollar amount they spend on subscriptions each month.', isTrue: false },
            { text: 'Some services can negotiate lower bills on your behalf.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm10-l3',
        number: 3,
        title: 'Credit Monitoring & Identity Protection Services',
        slides: [
          C('m10-l3-c1', 'C1', "Your credit score and personal identity are two of your most valuable financial assets — and they need to be protected. That's where credit monitoring and identity protection services come in."),
          C('m10-l3-c2', 'C2', 'Credit monitoring services track your credit report and alert you to changes: a new account opened in your name, a hard inquiry, a change in your score, or a new address added to your file. Early detection is everything when it comes to fraud.'),
          C('m10-l3-c3', 'C3', "What they do: Send alerts when your credit report changes · Show you your credit score and what's affecting it · Notify you of potential identity theft indicators · Some offer credit score simulators — 'what would happen to my score if I paid off this card?'"),
          C('m10-l3-c4', 'C4', 'Identity theft protection services go a step further. They monitor the dark web for your personal information (SSN, email, passwords), alert you if your data appears in a breach, and help you recover if your identity is stolen.'),
          MC(
            'm10-l3-p1',
            'P1',
            'What does a credit monitoring service do?',
            [
              'Loans you money when your score is low',
              'Tracks changes to your credit report and alerts you to potential fraud',
              'Automatically improves your credit score',
              "Replaces your credit card if it's stolen",
            ],
            1
          ),
          C('m10-l3-c5', 'C5', 'You are entitled to one free credit report per year from each of the three major credit bureaus (Equifax, Experian, TransUnion) at AnnualCreditReport.com. Reviewing these regularly — even without a paid service — is a smart habit.'),
          C('m10-l3-c6', 'C6', 'A credit freeze is a free tool you can use directly with each credit bureau. It prevents anyone from opening new credit in your name until you lift it. One of the strongest protections against identity theft — and completely free.'),
          SA('m10-l3-p2', 'P2', 'Which of the following are things a credit monitoring service might do?', [
            { label: 'Alert you when a new account is opened in your name', isCorrect: true },
            { label: 'Automatically repair your credit score', isCorrect: false },
            { label: 'Notify you if your data appears in a data breach', isCorrect: true },
            { label: "Show you what's affecting your credit score", isCorrect: true },
            { label: 'Prevent all fraud from ever happening', isCorrect: false },
          ]),
          TF('m10-l3-p3', 'P3', [
            { text: 'You can freeze your credit for free to prevent unauthorized accounts from being opened.', isTrue: true },
            { text: 'You need to pay for a service to access your credit report.', isTrue: false },
            { text: 'Credit monitoring alerts you to changes on your credit report.', isTrue: true },
          ]),
        ],
      },
      {
        id: 'm10-l4',
        number: 4,
        title: 'Investment & Robo-Advisor Services',
        slides: [
          C('m10-l4-c1', 'C1', 'Once you have a handle on budgeting and saving, the next tool category to know about is investing services — ranging from full-service brokerages to automated platforms built for beginners.'),
          C('m10-l4-c2', 'C2', 'Brokerage accounts — accounts specifically for buying and selling investments like stocks, ETFs, bonds, and mutual funds. Unlike a bank account, these are not FDIC insured. The value of your investments can go up or down.'),
          C('m10-l4-c3', 'C3', 'Robo-advisors — automated investing platforms that build and manage a diversified portfolio for you based on your goals, timeline, and risk tolerance. You answer a few questions, deposit money, and the platform handles the rest.'),
          C('m10-l4-c4', 'C4', 'What robo-advisors do: Automatically build a diversified portfolio of low-cost index funds or ETFs · Rebalance your portfolio over time as markets shift · Adjust your risk level as you approach your goal · Typically charge a small annual fee (often 0.25% or less).'),
          MC(
            'm10-l4-p1',
            'P1',
            'What is a robo-advisor?',
            [
              'A human financial advisor who works online',
              'An AI that predicts which stocks will go up',
              'An automated platform that builds and manages an investment portfolio for you',
              'A type of savings account with variable interest',
            ],
            2
          ),
          C('m10-l4-c5', 'C5', 'Micro-investing apps are another entry point. These platforms let you invest very small amounts — sometimes rounding up your purchases to the nearest dollar and investing the change. Designed to make investing accessible even with very little to start.'),
          C('m10-l4-c6', 'C6', "The key difference from a savings account: your money can grow significantly more over time, but it can also lose value in the short term. These are long-term tools — not places for money you'll need within a year or two."),
          TF('m10-l4-p2', 'P2', [
            { text: 'Brokerage accounts are FDIC insured like bank accounts.', isTrue: false },
            { text: 'Robo-advisors automatically rebalance your portfolio over time.', isTrue: true },
            { text: 'Micro-investing apps require large minimum deposits to get started.', isTrue: false },
          ]),
          SA('m10-l4-p3', 'P3', 'Which of the following are true about robo-advisors?', [
            { label: 'They build a diversified portfolio based on your goals', isCorrect: true },
            { label: 'They guarantee investment returns', isCorrect: false },
            { label: 'They typically charge low fees', isCorrect: true },
            { label: 'They manage your portfolio automatically over time', isCorrect: true },
            { label: 'They are FDIC insured', isCorrect: false },
          ]),
        ],
      },
      {
        id: 'm10-l5',
        number: 5,
        title: 'Insurance, Tax & Other Financial Services',
        slides: [
          C('m10-l5-c1', 'C1', 'The financial services ecosystem extends beyond banking and investing. Here are a few more categories worth knowing as you enter adulthood.'),
          C('m10-l5-c2', 'C2', "Insurance services — protect you from financial loss due to unexpected events. Health insurance, auto insurance, renters insurance, and life insurance all fall here. These services don't build wealth — they protect it. A single medical bill or car accident without insurance can be financially devastating."),
          C('m10-l5-c3', 'C3', "Renters insurance deserves a special callout for young adults. It's one of the cheapest and most overlooked forms of insurance. For roughly $10–$20/month, it covers your personal belongings if there's a fire, theft, or other covered event in your apartment."),
          C('m10-l5-c4', 'C4', 'Tax preparation services — companies and software platforms that help you prepare and file your tax return. Some are fully automated; others connect you with a live tax professional. For simple returns, free software often does the job perfectly.'),
          MC(
            'm10-l5-p1',
            'P1',
            'What is the main purpose of insurance?',
            [
              'To grow your money over time',
              'To protect you from financial loss due to unexpected events',
              'To replace a savings account',
              'To help you file your taxes',
            ],
            1
          ),
          C('m10-l5-c5', 'C5', 'Payment and transfer services — platforms that make it easy to send and receive money instantly. Peer-to-peer payment apps let you split bills, pay friends, and receive money. Useful tools, but some have fees for instant transfers or for sending money via credit card.'),
          C('m10-l5-c6', 'C6', 'Financial planning services — working with a licensed financial planner (CFP) helps you map out your long-term strategy: retirement planning, college savings, tax optimization, estate planning. More relevant as your financial life grows in complexity, but worth knowing exists.'),
          C('m10-l5-c7', 'C7', "The big picture: as your financial life grows, so does your toolkit. You don't need every service right now — but knowing they exist means you'll know where to turn when you need them."),
          SA('m10-l5-p2', 'P2', 'Which of the following are types of financial services?', [
            { label: 'Budgeting apps', isCorrect: true },
            { label: 'Renters insurance', isCorrect: true },
            { label: 'Tax preparation software', isCorrect: true },
            { label: 'Social media platforms', isCorrect: false },
            { label: 'Robo-advisors', isCorrect: true },
            { label: 'Credit monitoring', isCorrect: true },
          ]),
          TF('m10-l5-p3', 'P3', [
            { text: 'Renters insurance is expensive and only worth it for homeowners.', isTrue: false },
            { text: 'Peer-to-peer payment apps may charge fees for certain types of transfers.', isTrue: true },
            { text: 'A certified financial planner can help with long-term financial strategy.', isTrue: true },
          ]),
        ],
      },
    ],
  }),
];
