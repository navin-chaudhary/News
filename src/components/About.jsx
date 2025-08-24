import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                News Analysis: Trump's Tactics Against Harris
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Politicians have long cast their opponents as outsiders. But Donald J. Trump has taken the strategy to the next level against Kamala Harris.
              </p>
              <div className="flex items-center mt-6">
                <img
                  src="news-logo.png"
                  alt="The New York Times"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">By Adam Nagourney</p>
                  <p className="text-blue-100 text-sm">Aug. 2, 2024 • Updated 2:06 p.m. ET</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            <div className="max-w-3xl mx-auto prose prose-lg">
              {/* Featured Image */}
              <div className="mb-8">
                <img 
                  src="trump.png" 
                  alt="Donald Trump" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Former President Donald J. Trump repeatedly made false assertions about Vice President Kamala Harris's racial identity this week.
                </p>
              </div>

              {/* Article Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl font-semibold text-gray-900">
                  "She is not one of us."
                </p>
                
                <p>
                  When former President Donald J. Trump challenged Vice President Kamala Harris's racial identity at a public forum on Wednesday — and again on social media the next day — that was the message at the core of his remarks.
                </p>

                <p>
                  It is a tactic that has long been part of the underside of American politics: presenting an opponent as somehow "other" or "not one of us" — someone who cannot be trusted or truly known.
                </p>

                <p>
                  But while this has been a recurrent theme in American campaigns for at least a century, Mr. Trump has taken it to a new level, historians and analysts said. What has often been a subtext or a whisper campaign driven by surrogates is, in Mr. Trump's hands, a central message of his campaign — projected on screens at a rally, promoted on social media and reinforced by his running mate.
                </p>

                <p>
                  Mr. Trump has personally led the effort, explicitly falsifying the biography of his opponent and invoking race and gender in ways no modern major-party leader has done before. Even as a noncandidate in the 2008 election, he deployed such tactics against Barack Obama, demanding to see Mr. Obama's birth certificate and claiming that Mr. Obama — who went on to be the nation's first Black president and was born in Hawaii — was not born in this country.
                </p>

                {/* Quote Box */}
                <blockquote className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded-r-lg">
                  <p className="text-lg italic text-gray-800">
                    "Whenever the United States is poised to break a political glass ceiling, we see an intensification of othering in our politics. What makes Trump a singularly poisonous political player is that the top of the ticket is overtly engaging in othering against his political opponent."
                  </p>
                  <cite className="text-sm text-gray-600 mt-2 block">
                    — Timothy Naftali, presidential historian at Columbia University
                  </cite>
                </blockquote>

                <p>
                  Over decades, the tactic of othering has been wielded against candidates with various backgrounds, characteristics and traits, among them race, ethnicity, gender, economic class and religion — all in the service of making them seem alien to voters. And it has often been effective.
                </p>

                {/* Historical Context Image */}
                <div className="my-8">
                  <img 
                    src="people.png" 
                    alt="Historical political campaign" 
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    In 1928, Gov. Al Smith of New York became the first Roman Catholic presidential nominee of a major American political party, prompting opponents to suggest he would be beholden to the Pope.
                  </p>
                </div>

                <p>
                  And it has long been a strain of politics in New York City, where Mr. Trump spent many of the formative years of his life. In 1989, Rudolph Giuliani, who went on to become a close ally of Mr. Trump, ran against Mayor David N. Dinkins, who was Black. One of Mr. Giuliani's top campaign surrogates, the comedian Jackie Mason, described Mr. Dinkins with a pejorative term used against Black people.
                </p>

                <p>
                  In the case of Ms. Harris, Mr. Trump for weeks had mispronounced Ms. Harris's first name, Kamala, which is a common name in India, and he made fun of her laugh. On Wednesday, during an interview at the National Association of Black Journalists convention, he said he had only recently realized that she identified as Black, asserting — falsely — that she had abruptly changed her identity.
                </p>

                {/* Live Updates Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    2024 Election: Live Updates
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Updated 1 hour ago</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="hover:text-blue-600 cursor-pointer underline">
                        Kamala Harris has the votes needed to be Democrats' nominee, D.N.C. says
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="hover:text-blue-600 cursor-pointer underline">
                        Olympic champion Simone Biles posted on social media that she loves her "Black job."
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="hover:text-blue-600 cursor-pointer underline">
                        Here's the latest on the presidential race.
                      </span>
                    </li>
                  </ul>
                </div>

                <p>
                  Mr. Obama was elected president, despite Mr. Trump's attempt to question his citizenship. "I think it will work less," said Howard Wolfson, a former senior adviser to Hillary Clinton, a Democrat, who lost the presidential election to Mr. Trump in 2016. "The country is different. But given the politics he grew up in, it's not surprising that it's Trump's first instinct."
                </p>

                {/* Additional Images */}
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div>
                    <img 
                      src="2person.png" 
                      alt="Political campaign scene" 
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      A top supporter of Rudolph Giuliani used a pejorative term to describe Black people against Mayor David N. Dinkins during the 1989 New York City mayoral race.
                    </p>
                  </div>
                  <div>
                    <img 
                      src="3person.png" 
                      alt="John McCain campaign" 
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Senator John McCain refused to engage in the false claims about Barack Obama's nationality during their presidential contest in 2008.
                    </p>
                  </div>
                </div>

                <p>
                  Eight years later, Mr. Obama's campaign set out to portray Mitt Romney, his Republican challenger, as an elite business executive whose company thrived at the expense of its employees. One advertisement, presenting Mr. Romney as a mysterious millionaire, questioned why he would not release his tax returns. "What is Mr. Romney hiding?" it asked.
                </p>

                <p>
                  Candidates from both parties often try to keep a distance from this kind of tactic because it is polarizing and risks a backlash. In 2008, John McCain, the Republican candidate running against Mr. Obama, distanced himself from the birtherism claims about Mr. Obama's nationality that percolated among voters across the country.
                </p>

                <p>
                  "I can't trust Obama," a woman said to Mr. McCain at a rally in Lakeville, Minn., a month before Election Day in 2008. "He's an Arab." Mr. McCain shook his head. "No ma'am," he said. "He's a decent family man, citizen, that I just happen to have disagreements with on fundamental issues that is what this campaign is all about."
                </p>

                <p>
                  Dr. Naftali, the presidential historian, said he had come across evidence of politicians resorting to this kind of tactic since the time of Abraham Lincoln: Some of Mr. Lincoln's opponents started a whispering campaign that he had Black ancestors.
                </p>

                <p>
                  But it is fair to say that no presidential nominee in the nation's history has embraced this tactic so frontally and exuberantly as Mr. Trump has. He turned up the volume on these strategies as his campaign witnessed the enthusiastic response to the arrival of Ms. Harris, at least among Democrats.
                </p>

                <p>
                  "It's easier to play up the fears, the angst and the resentments that people have about others — aspects of individuals' lives that they don't like — than actually confront real issues," said Michael Steele, the former head of the Republican National Committee.
                </p>

                <p className="text-xl font-semibold text-gray-900 text-center py-4 border-t border-gray-200">
                  "Trump has perfected it," he said.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
