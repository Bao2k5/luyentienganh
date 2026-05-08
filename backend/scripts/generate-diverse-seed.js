require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Question = require('../models/Question');

const subjects = [
    {en: "I", vi: "Tôi", p: true, be: "am", pastBe: "was", do: "do", did: "did"},
    {en: "He", vi: "Anh ấy", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "She", vi: "Cô ấy", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "They", vi: "Họ", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "We", vi: "Chúng tôi", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "My brother", vi: "Anh trai tôi", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "The students", vi: "Các học sinh", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "Mary", vi: "Mary", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "My parents", vi: "Bố mẹ tôi", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "John", vi: "John", p: false, be: "is", pastBe: "was", do: "does", did: "did"}
];

const advs = ["never", "always", "usually", "often", "sometimes", "rarely", "occasionally", "hardly ever", "always", "often"];
const advsVi = ["không bao giờ", "luôn luôn", "thường xuyên", "thường", "thỉnh thoảng", "hiếm khi", "đôi khi", "hầu như không bao giờ", "luôn luôn", "thường"];

// Q1: Adverb before verb (Sentence|Translation|verb|verb+s/es)
const q1_list = [
    "play tennis|chơi quần vợt|play|plays",
    "go jogging|chạy bộ|go|goes",
    "eat out|ăn ngoài|eat|eats",
    "visit museums|thăm bảo tàng|visit|visits",
    "watch movies|xem phim|watch|watches",
    "cook dinner|nấu bữa tối|cook|cooks",
    "clean the classroom|dọn phòng học|clean|cleans",
    "read news|đọc tin tức|read|reads",
    "travel abroad|đi du lịch nước ngoài|travel|travels",
    "do yoga|tập yoga|do|does"
];

// Q2: Adverb after to be (Adjective|Translation)
const q2_list = [
    "late for school|muộn học", "happy at work|vui vẻ ở chỗ làm", "tired in the morning|mệt mỏi vào buổi sáng", 
    "busy on weekends|bận rộn vào cuối tuần", "hungry at night|đói vào ban đêm", "ready for exams|sẵn sàng cho kỳ thi", 
    "excited about trips|hào hứng về chuyến đi", "nervous before tests|lo lắng trước bài kiểm tra", 
    "bored at home|buồn chán ở nhà", "careful with money|cẩn thận với tiền bạc"
];

// Q3: How often (Verb phrase|Translation)
const q3_list = [
    "travel abroad|đi du lịch nước ngoài", "visit your parents|thăm bố mẹ", "go to the gym|đến phòng gym",
    "clean your room|dọn phòng", "check your emails|kiểm tra email", "buy new clothes|mua quần áo mới",
    "eat fast food|ăn đồ ăn nhanh", "play video games|chơi trò chơi điện tử", "go swimming|đi bơi", "read the news|đọc tin tức"
];

// Q4: Present Simple Truth (Subject|Verb|Rest|viSubj|viVerb|viRest|viTense)
const q4_list = [
    "Water|boils|at 100°C|Nước|sôi|ở 100°C|boils|boil|boiling",
    "The sun|rises|in the east|Mặt trời|mọc|ở hướng đông|rises|rise|rising",
    "Ice|melts|at 0°C|Đá|tan chảy|ở 0°C|melts|melt|melting",
    "Wood|floats|on water|Gỗ|nổi|trên mặt nước|floats|float|floating",
    "Plants|need|light to grow|Thực vật|cần|ánh sáng để phát triển|need|needs|needing",
    "Earth|goes|around the sun|Trái đất|quay|quanh mặt trời|goes|go|going",
    "A magnet|attracts|iron|Nam châm|hút|sắt|attracts|attract|attracting",
    "Birds|have|feathers|Chim chóc|có|lông vũ|have|has|having",
    "Fish|live|in water|Cá|sống|dưới nước|live|lives|living",
    "Humans|breathe|oxygen|Con người|hít thở|oxy|breathe|breathes|breathing"
];

// Q5: Present Simple Schedule (Subject|Verb|Rest|viSubj|viVerb|viRest)
const q5_list = [
    "The train|leaves|at 9 AM|Chuyến tàu|rời đi|lúc 9 giờ sáng",
    "The bus|arrives|at 10 PM|Chuyến xe buýt|đến nơi|lúc 10 giờ tối",
    "The flight|departs|at midnight|Chuyến bay|khởi hành|lúc nửa đêm",
    "The match|starts|at 3 PM|Trận đấu|bắt đầu|lúc 3 giờ chiều",
    "The museum|opens|at 8 AM|Bảo tàng|mở cửa|lúc 8 giờ sáng",
    "The supermarket|closes|at 11 PM|Siêu thị|đóng cửa|lúc 11 giờ tối",
    "The movie|ends|at 10:30 PM|Bộ phim|kết thúc|lúc 10 rưỡi tối",
    "The class|begins|at 7 AM|Lớp học|bắt đầu|lúc 7 giờ sáng",
    "The festival|takes place|on Sunday|Lễ hội|diễn ra|vào Chủ nhật",
    "The meeting|finishes|at noon|Cuộc họp|kết thúc|lúc buổi trưa"
];

// Q6: Present Continuous (Phrase|Translation|verb|ving)
const q6_list = [
    "send a text message|gửi một tin nhắn|send|sending",
    "write an email|viết email|write|writing",
    "talk on the phone|nói chuyện điện thoại|talk|talking",
    "drink coffee|uống cà phê|drink|drinking",
    "wait for a bus|đợi xe buýt|wait|waiting",
    "have lunch|ăn trưa|have|having",
    "study for a test|học cho bài kiểm tra|study|studying",
    "play a game|chơi game|play|playing",
    "listen to a podcast|nghe podcast|listen|listening",
    "look at a map|nhìn bản đồ|look|looking"
];

// Q7: Stative Verbs
const q7_list = [
    "know what you mean|biết ý của bạn|know|knows|knowing|knew",
    "believe his story|tin câu chuyện của anh ấy|believe|believes|believing|believed",
    "understand the lesson|hiểu bài học|understand|understands|understanding|understood",
    "like this song|thích bài hát này|like|likes|liking|liked",
    "need some help|cần chút sự giúp đỡ|need|needs|needing|needed",
    "want a drink|muốn một đồ uống|want|wants|wanting|wanted",
    "love this city|yêu thành phố này|love|loves|loving|loved",
    "remember her name|nhớ tên cô ấy|remember|remembers|remembering|remembered",
    "prefer tea|thích trà hơn|prefer|prefers|preferring|preferred",
    "hate the cold weather|ghét thời tiết lạnh|hate|hates|hating|hated"
];

// Q8: Past Simple Affirmative
const q8_list = [
    "went to Mexico|đi Mexico|go|goes|went|going",
    "bought a new car|mua một chiếc xe mới|buy|buys|bought|buying",
    "saw a good film|xem một bộ phim hay|see|sees|saw|seeing",
    "ate at a restaurant|ăn ở nhà hàng|eat|eats|ate|eating",
    "met some friends|gặp vài người bạn|meet|meets|met|meeting",
    "found a wallet|tìm thấy một chiếc ví|find|finds|found|finding",
    "lost his keys|đánh mất chìa khóa|lose|loses|lost|losing",
    "drank some milk|uống chút sữa|drink|drinks|drank|drinking",
    "wrote a letter|viết một lá thư|write|writes|wrote|writing",
    "slept early|ngủ sớm|sleep|sleeps|slept|sleeping"
];

// Q9: Past Simple Negative
const q9_list = [
    "like the film|thích bộ phim", "finish the project|hoàn thành dự án", "see him at the party|thấy anh ấy ở bữa tiệc",
    "arrive on time|đến đúng giờ", "answer my call|trả lời cuộc gọi của tôi", "open the door|mở cửa",
    "pass the exam|qua kỳ thi", "tell the truth|nói sự thật", "work yesterday|làm việc ngày hôm qua", "bring the umbrella|mang theo ô"
];

// Q10: Past Simple Question
const q10_list = [
    "enjoy the party|thích bữa tiệc", "find your keys|tìm thấy chìa khóa", "see the news|xem tin tức",
    "hear that noise|nghe thấy tiếng ồn đó", "buy the tickets|mua vé", "talk to him|nói chuyện với anh ấy",
    "sleep well|ngủ ngon", "finish the report|hoàn thành báo cáo", "go out|đi chơi", "call me|gọi cho tôi"
];

// Q11: Past Simple Spelling (-ied)
const q11_list = [
    "study for the exam|học cho bài kiểm tra|studied|study|studies",
    "try to call|cố gắng gọi|tried|try|tries",
    "carry the bags|mang những chiếc túi|carried|carry|carries",
    "cry at the end|khóc vào lúc cuối|cried|cry|cries",
    "reply to the email|trả lời email|replied|reply|replies",
    "hurry to the station|vội vã đến nhà ga|hurried|hurry|hurries",
    "worry about the test|lo lắng về bài thi|worried|worry|worries",
    "marry his girlfriend|kết hôn với bạn gái|married|marry|marries",
    "empty the bin|đổ thùng rác|emptied|empty|empties",
    "copy the notes|chép lại ghi chú|copied|copy|copies"
];

// Q12: Wh- Question (What)
const q12_list = ["email address|địa chỉ email", "phone number|số điện thoại", "full name|họ và tên", "favorite color|màu yêu thích", "dream job|công việc mơ ước", "main hobby|sở thích chính", "home address|địa chỉ nhà", "favorite food|món ăn yêu thích", "ultimate goal|mục tiêu cuối cùng", "biggest fear|nỗi sợ lớn nhất"];

// Q13: Wh- Question (Where)
const q13_list = [
    "go? - To London|đi? - Đến London", "stay? - In Paris|ở? - Ở Paris", "work? - At a bank|làm việc? - Ở ngân hàng",
    "live? - In Tokyo|sống? - Ở Tokyo", "eat? - At the cafe|ăn? - Ở quán cà phê", "meet? - At the park|gặp nhau? - Ở công viên",
    "hide? - Under the bed|trốn? - Dưới gầm giường", "park? - In the garage|đỗ xe? - Trong gara", "sit? - On the sofa|ngồi? - Trên ghế sofa", "travel? - To Vietnam|đi du lịch? - Đến Việt Nam"
];

// Q14: Can Request
const q14_list = [
    "help me with this|giúp tôi việc này", "open the window|mở cửa sổ", "pass the salt|đưa lọ muối",
    "turn off the light|tắt đèn", "speak louder|nói to hơn", "repeat that|nhắc lại điều đó",
    "close the door|đóng cửa", "wait a minute|đợi một phút", "show me the way|chỉ đường cho tôi", "call a taxi|gọi một chiếc taxi"
];

// Q15: Past Continuous
const q15_list = [
    "wait for a long time|chờ đợi một thời gian dài", "sleep on the sofa|ngủ trên ghế sofa", "read a magazine|đọc một cuốn tạp chí",
    "play chess|chơi cờ vua", "talk to the manager|nói chuyện với quản lý", "look out the window|nhìn ra ngoài cửa sổ",
    "drive to work|lái xe đi làm", "listen to the radio|nghe đài", "work in the garden|làm việc trong vườn", "stand outside|đứng bên ngoài"
];

// Q16: Past Continuous Interrupted (while)
const q16_list = [
    "He called while I _______ lunch.|Anh ấy đã gọi trong khi tôi _______ bữa trưa.|was making",
    "The power went out while we _______ TV.|Mất điện trong khi chúng tôi _______ TV.|were watching",
    "It started to rain while they _______ football.|Trời bắt đầu mưa trong khi họ _______ bóng đá.|were playing",
    "I dropped my phone while I _______ for the bus.|Tôi đánh rơi điện thoại trong khi tôi _______ xe buýt.|was waiting",
    "She hurt her leg while she _______|Cô ấy bị đau chân trong khi cô ấy _______|was running",
    "The bell rang while the students _______|Chuông reo trong khi học sinh _______|were studying",
    "He arrived while my parents _______ dinner.|Anh ấy đến trong khi bố mẹ tôi _______ bữa tối.|were cooking",
    "I saw an accident while I _______ to work.|Tôi thấy một vụ tai nạn trong khi tôi _______ đi làm.|was driving",
    "My pen broke while I _______ the essay.|Bút của tôi bị hỏng trong khi tôi _______ bài luận.|was writing",
    "The dog barked while Mary _______|Chó sủa trong khi Mary _______|was sleeping"
];

// Q17: when vs while
const q17_list = [
    "I was making lunch _______ he called.|khi anh ấy gọi",
    "We were watching TV _______ the power went out.|khi mất điện",
    "They were playing football _______ it started to rain.|khi trời bắt đầu mưa",
    "I was waiting for the bus _______ I dropped my phone.|khi tôi đánh rơi điện thoại",
    "She was running _______ she hurt her leg.|khi cô ấy bị đau chân",
    "The students were studying _______ the bell rang.|khi chuông reo",
    "My parents were cooking dinner _______ he arrived.|khi anh ấy đến",
    "I was driving to work _______ I saw an accident.|khi tôi thấy một vụ tai nạn",
    "I was writing the essay _______ my pen broke.|khi bút bị hỏng",
    "Mary was sleeping _______ the dog barked.|khi chó sủa"
];

// Q18: something/someone/somewhere
const q18_list = [
    "eat something. I'm hungry.|ăn thứ gì đó. Tôi đang đói.",
    "drink something. I'm thirsty.|uống thứ gì đó. Tôi đang khát.",
    "talk to someone. I'm lonely.|nói chuyện với ai đó. Tôi cô đơn.",
    "go somewhere. I'm bored.|đi đâu đó. Tôi đang buồn chán.",
    "buy something. I need clothes.|mua thứ gì đó. Tôi cần quần áo.",
    "ask someone. I'm lost.|hỏi ai đó. Tôi bị lạc.",
    "find somewhere quiet. I have a headache.|tìm nơi nào đó yên tĩnh. Tôi bị đau đầu.",
    "read something. I have free time.|đọc thứ gì đó. Tôi có thời gian rảnh.",
    "meet someone new. I want to make friends.|gặp ai đó mới. Tôi muốn kết bạn.",
    "hide something. It's a secret.|giấu thứ gì đó. Đó là bí mật."
];

// Q19: anything/anyone/anywhere
const q19_list = [
    "eat anything|ăn bất cứ thứ gì", "drink anything|uống bất cứ thứ gì", "see anyone|thấy bất cứ ai",
    "go anywhere|đi bất cứ đâu", "buy anything|mua bất cứ thứ gì", "meet anyone|gặp bất cứ ai",
    "find anywhere to park|tìm bất cứ chỗ nào để đỗ xe", "read anything|đọc bất cứ thứ gì", "say anything|nói bất cứ điều gì", "know anyone|biết bất cứ ai"
];

// Q20: nothing/no one/nowhere
const q20_list = [
    "nothing to drink|không có gì để uống", "no one to talk to|không có ai để nói chuyện cùng", "nowhere to go|không có nơi nào để đi",
    "nothing to eat|không có gì để ăn", "nothing to do|không có gì để làm", "no one at home|không có ai ở nhà",
    "nowhere to hide|không có nơi nào để trốn", "nothing to say|không có gì để nói", "no one in the room|không có ai trong phòng", "nothing left|không còn gì"
];

// Q21: everyone/everything
const q21_list = [
    "Everyone was happy at the party.|Mọi người đều vui vẻ ở bữa tiệc.",
    "Everything is ready for the meeting.|Mọi thứ đã sẵn sàng cho cuộc họp.",
    "Everyone wants to succeed.|Mọi người đều muốn thành công.",
    "Everything costs more nowadays.|Mọi thứ đều đắt đỏ hơn ngày nay.",
    "Everyone knows the truth.|Mọi người đều biết sự thật.",
    "Everything was perfect on that day.|Mọi thứ đều hoàn hảo vào ngày hôm đó.",
    "Everyone is waiting outside.|Mọi người đang đợi bên ngoài.",
    "Everything looks clean here.|Mọi thứ trông có vẻ sạch sẽ ở đây.",
    "Everyone loves this movie.|Mọi người đều yêu thích bộ phim này.",
    "Everything goes according to plan.|Mọi thứ diễn ra theo kế hoạch."
];

// Q22: be going to
const q22_list = [
    "buy a new phone|mua một chiếc điện thoại mới", "start a new job|bắt đầu công việc mới", "visit my grandparents|thăm ông bà",
    "sell my car|bán xe", "learn Spanish|học tiếng Tây Ban Nha", "move to a new city|chuyển đến thành phố mới",
    "clean the garage|dọn dẹp gara", "bake a cake|nướng bánh", "take a vacation|đi nghỉ mát", "paint the house|sơn lại nhà"
];

// Q23: be going to negative
const q23_list = [
    "work tomorrow|đi làm vào ngày mai", "cook tonight|nấu ăn tối nay", "travel this summer|đi du lịch mùa hè này",
    "buy that expensive car|mua chiếc xe đắt tiền đó", "attend the meeting|tham dự cuộc họp", "watch TV later|xem TV lát nữa",
    "play football this weekend|chơi bóng đá cuối tuần này", "invite him to the party|mời anh ấy đến bữa tiệc", "change my mind|thay đổi ý định", "stay up late|thức khuya"
];

// Q24: won't promise
const q24_list = [
    "tell anyone|nói với ai", "forget your birthday|quên sinh nhật bạn", "be late again|đến muộn nữa",
    "make that mistake|phạm sai lầm đó", "lose it|làm mất nó", "let you down|làm bạn thất vọng",
    "stop trying|ngừng cố gắng", "leave without you|rời đi mà không có bạn", "hurt your feelings|làm tổn thương bạn", "break my promise|thất hứa"
];

// Q25: will offer
const q25_list = [
    "help you|giúp bạn", "carry your bags|mang túi cho bạn", "open the door for you|mở cửa cho bạn",
    "pay for the tickets|trả tiền vé", "lend you some money|cho bạn mượn tiền", "show you the way|chỉ đường cho bạn",
    "call a taxi for you|gọi taxi cho bạn", "make some coffee|pha cà phê", "turn on the AC|bật điều hòa", "drive you home|lái xe đưa bạn về"
];

// Q26: will spontaneous
const q26_list = [
    "close the window|đóng cửa sổ lại", "answer the phone|trả lời điện thoại", "check the email|kiểm tra email",
    "take a look|xem thử", "buy some water|mua chút nước", "ask the waiter|hỏi người phục vụ",
    "turn down the volume|vặn nhỏ âm lượng", "grab an umbrella|lấy một chiếc ô", "write it down|viết nó ra", "have a salad|ăn món salad"
];

// Q27: If no future - focuses on condition clause only, all 10 have DIFFERENT subjects+verbs
const q27_list = [
    "If I _______ time, I'll email you.|có thời gian|have|had|will have|am having",
    "If it _______ tomorrow, we'll cancel the trip.|mưa ngày mai|rains|rained|will rain|is raining",
    "If the bus _______, I'll take a taxi.|đến trễ|is late|was late|will be late|was being late",
    "If you _______ now, you'll reach on time.|rời đi|leave|left|will leave|are leaving",
    "If he _______ quickly, we'll miss the start.|ăn chậm|eats slowly|ate slowly|will eat slowly|is eating slowly",
    "If the weather _______ bad, we'll stay home.|trở xấu|gets bad|got bad|will get bad|is getting bad",
    "If the train _______, we'll be late.|khởi hành đúng giờ|departs on time|departed on time|will depart on time|is departing",
    "If she _______ me, I'll answer her.|gọi|calls|called|will call|is calling",
    "If they _______ hard, they'll win.|ôn luyện|practise|practised|will practise|are practising",
    "If you _______ your phone, I'll lend you mine.|để quên|forget|forgot|will forget|are forgetting"
];

// Q28: going to structure
const q28_list = [
    "I'm _______ watch the football tonight.|xem bóng đá", "He's _______ clean his room.|dọn phòng",
    "She's _______ call her mom.|gọi mẹ", "They're _______ build a house.|xây nhà",
    "We're _______ order pizza.|gọi pizza", "John is _______ buy a gift.|mua quà",
    "Mary is _______ take a photo.|chụp ảnh", "The students are _______ take a test.|làm bài kiểm tra",
    "My parents are _______ retire soon.|nghỉ hưu", "I'm _______ fix the car.|sửa xe"
];

// Q29: Zero cond
const q29_list = [
    "heat water to 100°C|it boils|sôi", "mix red and blue|you get purple|thu được",
    "freeze water|it becomes ice|trở thành", "touch fire|you get burned|bị bỏng",
    "don't water plants|they die|chết", "drop a glass|it breaks|vỡ",
    "eat too much|you get fat|trở nên", "stay in the rain|you get wet|bị ướt",
    "heat ice|it melts|tan chảy", "press the button|the screen turns on|bật sáng"
];

// Q30: Zero cond machine
const q30_list = [
    "the power is low|the red light flashes|nhấp nháy", "the door is open|the alarm rings|reo lên",
    "the temperature rises|the fan starts|khởi động", "the paper jams|the printer stops|dừng lại",
    "the battery is full|the green light turns on|bật sáng", "you push the lever|the machine works|hoạt động",
    "the tank is empty|the engine fails|ngừng chạy", "you insert a coin|the gate opens|mở ra",
    "the memory is full|the phone lags|bị giật", "you pull the string|the light goes off|tắt đi"
];

// Q31: First cond won't
const q31_list = [
    "rains|we won't go out|chúng ta sẽ không ra ngoài", "snows|the flights won't depart|chuyến bay sẽ không cất cánh",
    "is cold|I won't swim|tôi sẽ không bơi", "is late|she won't wait|cô ấy sẽ không đợi",
    "is expensive|they won't buy it|họ sẽ không mua", "is hard|we won't finish|chúng ta sẽ không hoàn thành",
    "is closed|you won't enter|bạn sẽ không vào được", "is busy|he won't call|anh ấy sẽ không gọi",
    "is dark|I won't walk alone|tôi sẽ không đi dạo một mình", "is far|we won't walk|chúng ta sẽ không đi bộ"
];

// Q32: First cond if - uses DIFFERENT structure (question format), all 10 unique verbs
const q32_list = [
    "If I _______ Dina, I'll give her your message.|gặp|see|saw|will see|am seeing",
    "If he _______ early, we'll go out.|đến|arrives|arrived|will arrive|is arriving",
    "If she _______ the game, she'll celebrate.|thắng|wins|won|will win|is winning",
    "If they _______ the map, they'll get lost.|làm rơi|drop|dropped|will drop|are dropping",
    "If you _______ your homework, the teacher will be happy.|nộp|submit|submitted|will submit|are submitting",
    "If we _______ the next train, we'll take a taxi.|lỡ chậu|miss|missed|will miss|are missing",
    "If John _______ the meeting, his boss will be angry.|vắng mặt|misses|missed|will miss|is missing",
    "If Mary _______ him in the park, she'll say hello.|bắt gặp|sees|saw|will see|is seeing",
    "If the dog _______, I'll feed it.|sủa|barks|barked|will bark|is barking",
    "If the baby _______, I'll hold him.|khóc|cries|cried|will cry|is crying"
];

// Q33: Comp short
const q33_list = [
    "big|bigger|to hơn", "small|smaller|nhỏ hơn", "tall|taller|cao hơn", "short|shorter|ngắn hơn",
    "fast|faster|nhanh hơn", "slow|slower|chậm hơn", "cheap|cheaper|rẻ hơn", "old|older|cũ hơn",
    "young|younger|trẻ hơn", "cold|colder|lạnh hơn"
];

// Q34: Sup long
const q34_list = [
    "expensive|most expensive|đắt nhất", "beautiful|most beautiful|đẹp nhất", "interesting|most interesting|thú vị nhất",
    "difficult|most difficult|khó nhất", "important|most important|quan trọng nhất", "dangerous|most dangerous|nguy hiểm nhất",
    "popular|most popular|phổ biến nhất", "comfortable|most comfortable|thoải mái nhất", "crowded|most crowded|đông đúc nhất", "modern|most modern|hiện đại nhất"
];

// Q35: Comp less
const q35_list = [
    "crowded|đông đúc hơn", "expensive|đắt đỏ hơn", "dangerous|nguy hiểm hơn", "difficult|khó khăn hơn",
    "popular|phổ biến hơn", "interesting|thú vị hơn", "beautiful|xinh đẹp hơn", "important|quan trọng hơn",
    "comfortable|thoải mái hơn", "modern|hiện đại hơn"
];

// Q36: Pres Perf Have/Has
const q36_list = [
    "_______ you ever been to Japan?|Have|Do|Did|Are", "_______ she ever eaten sushi?|Has|Does|Did|Is",
    "_______ they ever seen a ghost?|Have|Do|Did|Are", "_______ he ever played golf?|Has|Does|Did|Is",
    "_______ we ever met before?|Have|Do|Did|Are", "_______ John ever traveled alone?|Has|Does|Did|Is",
    "_______ Mary ever lost her phone?|Has|Does|Did|Is", "_______ the students ever passed this?|Have|Do|Did|Are",
    "_______ you ever driven a truck?|Have|Do|Did|Are", "_______ your brother ever won a prize?|Has|Does|Did|Is"
];

// Q37: never
const q37_list = [
    "seen Star Wars|xem Star Wars", "eaten snake|ăn thịt rắn", "been to Africa|đến Châu Phi",
    "driven a Ferrari|lái Ferrari", "met a famous person|gặp người nổi tiếng", "flown in a helicopter|bay trực thăng",
    "broken a bone|bị gãy xương", "ridden a horse|cưỡi ngựa", "sung on stage|hát trên sân khấu", "lost my wallet|mất ví"
];

// Q38: ever
const q38_list = [
    "food I have _______ eaten.|thức ăn|ăn", "movie I have _______ seen.|bộ phim|xem",
    "book I have _______ read.|cuốn sách|đọc", "place I have _______ visited.|nơi|đến thăm",
    "song I have _______ heard.|bài hát|nghe", "game I have _______ played.|trò chơi|chơi",
    "car I have _______ driven.|chiếc xe|lái", "person I have _______ met.|người|gặp",
    "joke I have _______ heard.|trò đùa|nghe", "thing I have _______ done.|việc|làm"
];

// Q39: Verb + ing
const q39_list = [
    "She practises _______ the piano every day.|playing|play|to play", "I enjoy _______ in the sea.|swimming|swim|to swim",
    "He finished _______ his homework.|doing|do|to do", "They don't mind _______ the window.|opening|open|to open",
    "We miss _______ in the countryside.|living|live|to live", "I recommend _______ this book.|reading|read|to read",
    "She avoids _______ in rush hour.|driving|drive|to drive", "He suggested _______ a break.|taking|take|to take",
    "I feel like _______ a pizza.|eating|eat|to eat", "They stopped _______ when the teacher came in.|talking|talk|to talk"
];

// Q40: Verb + to
const q40_list = [
    "We need _______ early.|to leave|leave|leaving", "They want _______ a new house.|to buy|buy|buying",
    "She decided _______ the job.|to accept|accept|accepting", "He promised _______ me.|to help|help|helping",
    "I hope _______ you soon.|to see|see|seeing", "We plan _______ to Europe.|to travel|travel|traveling",
    "She offered _______ the dishes.|to wash|wash|washing", "They agreed _______ the contract.|to sign|sign|signing",
    "He managed _______ the exam.|to pass|pass|passing", "I arranged _______ him at 5.|to meet|meet|meeting"
];

// Q41: Persuade sb to
const q41_list = [
    "He persuaded me _______ with him.|to go|go|going", "She asked him _______ the door.|to open|open|opening",
    "They wanted us _______ early.|to arrive|arrive|arriving", "I told her _______ quiet.|to be|be|being",
    "He advised me _______ hard.|to study|study|studying", "She invited him _______ dinner.|to have|have|having",
    "They warned us not _______ there.|to go|go|going", "I reminded her _______ the keys.|to bring|bring|bringing",
    "He allowed me _______ his car.|to use|use|using", "She expected him _______ on time.|to be|be|being"
];

// Q42: Start to/ing
const q42_list = [
    "English three years ago|tiếng Anh ba năm trước", "piano when I was five|piano khi tôi năm tuổi",
    "the book yesterday|cuốn sách ngày hôm qua", "the project last week|dự án tuần trước",
    "yoga last month|yoga tháng trước", "tennis recently|quần vợt gần đây",
    "Spanish last year|tiếng Tây Ban Nha năm ngoái", "the new job on Monday|công việc mới vào thứ Hai",
    "the course in September|khóa học vào tháng Chín", "painting as a hobby|vẽ như một sở thích"
];

// Q43: Relative who
const q43_list = [
    "The person _______ inspires me is my mother.|người truyền cảm hứng cho tôi", "The man _______ lives next door is a doctor.|người sống cạnh nhà",
    "The woman _______ called you is my aunt.|người đã gọi bạn", "The boy _______ broke the window is crying.|cậu bé đã làm vỡ cửa sổ",
    "The girl _______ won the prize is happy.|cô gái đã giành giải", "The teacher _______ teaches math is strict.|giáo viên dạy toán",
    "The student _______ got an A is smart.|học sinh đạt điểm A", "The player _______ scored the goal is my friend.|cầu thủ ghi bàn",
    "The singer _______ sang the song is famous.|ca sĩ hát bài hát", "The actor _______ played the hero is great.|diễn viên đóng vai anh hùng"
];

// Q44: Relative which
const q44_list = [
    "I found a book _______ I love.|cuốn sách", "This is the car _______ he bought.|chiếc xe",
    "The movie _______ we watched was scary.|bộ phim", "The bag _______ she lost was red.|chiếc túi",
    "The phone _______ I use is old.|chiếc điện thoại", "The house _______ they built is big.|ngôi nhà",
    "The song _______ is playing is my favorite.|bài hát", "The letter _______ arrived today is for you.|bức thư",
    "The cake _______ she baked is delicious.|chiếc bánh", "The dress _______ she wore was stunning.|chiếc váy"
];

// Q45: Relative where
const q45_list = [
    "the hotel _______ we stayed|khách sạn", "the city _______ I was born|thành phố",
    "the restaurant _______ we ate|nhà hàng", "the park _______ we met|công viên",
    "the school _______ he studies|ngôi trường", "the room _______ she sleeps|căn phòng",
    "the street _______ they live|con đường", "the hospital _______ he works|bệnh viện",
    "the shop _______ I bought it|cửa hàng", "the island _______ we visited|hòn đảo"
];

// Q46: Personality
const q46_list = [
    "doesn't often laugh|không hay cười|serious|nghiêm túc", "is always sure of himself|luôn tin chắc vào bản thân|confident|tự tin",
    "is kind and helpful|tốt bụng và hay giúp đỡ|friendly|thân thiện", "always tells the truth|luôn nói sự thật|honest|trung thực",
    "is calm with children|bình tĩnh với trẻ em|patient|kiên nhẫn", "keeps his promises|giữ lời hứa|reliable|đáng tin cậy",
    "makes new things|làm ra những thứ mới|creative|sáng tạo", "works hard and well|làm việc chăm chỉ và tốt|professional|chuyên nghiệp",
    "doesn't smile much|không cười nhiều|serious|nghiêm túc", "speaks well in public|nói tốt trước đám đông|confident|tự tin"
];

// Q47: Subjects
const q47_list = [
    "a Shakespeare play|một vở kịch Shakespeare|drama|kịch", "paints and brushes|sơn và cọ|art|mỹ thuật",
    "the human heart|trái tim con người|biology|sinh học", "numbers and equations|số và phương trình|maths|toán",
    "light and colour|ánh sáng và màu sắc|physics|vật lý", "past events and dates|các sự kiện và ngày tháng trong quá khứ|history|lịch sử",
    "maps and countries|bản đồ và các quốc gia|geography|địa lý", "liquids and reactions|chất lỏng và phản ứng|chemistry|hóa học",
    "computer programs|chương trình máy tính|IT|tin học", "football and sports|bóng đá và thể thao|PE|thể dục"
];

// Q48: Food - all 10 items UNIQUE
const q48_list = [
    "doesn't eat meat or fish|không ăn thịt hay cá|vegetarian|người ăn chay",
    "doesn't eat animal products|không ăn các sản phẩm từ động vật|vegan|người ăn chay thuần",
    "gets sick from nuts|bị ốm vì ăn các loại hạt|allergy|dị ứng",
    "is very tasty|rất ngon|delicious|ngon",
    "is the best on the menu|là ngon nhất trong thực đơn|dish|món ăn",
    "is not cooked|chưa được nấu chín|raw|sống",
    "cooks the meal|nấu bữa ăn|chef|đầu bếp",
    "brings the food to the table|mang thức ăn ra bàn|waiter|bồi bàn",
    "prefers food grown without chemicals|thích thực phẩm hữu cơ không dùng hóa chất|organic|hữu cơ",
    "cannot eat dairy or eggs|không thể ăn sữa hay trứng|intolerance|không dung nạp"
];

// Q49: Motivation
const q49_list = [
    "learning a new language|học một ngôn ngữ mới|challenge|thử thách", "her students to study|học sinh của cô ấy học tập|encourage|khuyến khích",
    "a lot of for his essay|rất nhiều cho bài tiểu luận của anh ấy|praise|lời khen", "a return flight to New York|một chuyến bay khứ hồi tới New York|prize|giải thưởng",
    "us by sending us to bed early|chúng tôi bằng cách bắt chúng tôi đi ngủ sớm|punish|phạt", "your phone call|cuộc gọi của bạn|purpose|mục đích",
    "for any information|cho bất kỳ thông tin nào|reward|phần thưởng", "climbing the mountain|leo núi|challenge|thử thách",
    "the team to win|đội bóng giành chiến thắng|encourage|khuyến khích", "the best student|học sinh xuất sắc nhất|prize|giải thưởng"
];

// Q50: Extreme Adj - all 10 UNIQUE and wrong options chosen carefully
const q50_list = [
    "views from the mountain|Cảnh nhìn từ ngọn núi|spectacular|ngoạn mục",
    "accommodation we stayed in|Chỗ ở mà chúng tôi ở|awful|tệ hại",
    "cake she baked|Chiếc bánh mà cô ấy nướng|brilliant|tuyệt vời",
    "food at the restaurant|Đồ ăn ở nhà hàng|disgusting|kinh tởm",
    "house he lives in|Ngôi nhà anh ấy đang sống|enormous|khổng lồ",
    "bedroom I sleep in|Phòng ngủ tôi ngủ|filthy|bẩn thỉu",
    "weather outside|Thời tiết bên ngoài|freezing|lạnh cóng",
    "room she rented|Căn phòng cô ấy thuê|tiny|nhỏ bé",
    "concert last night|Buổi hòa nhạc tối qua|amazing|tuyệt vời",
    "smell coming from the kitchen|Mùi từ bếp toả ra|disgusting|kinh tởm"
];

const allQuestions = [];

const commonMistakes = {
    1: "⚠️ Lỗi thường gặp: Đặt trạng từ tần suất sai vị trí. Nhớ: TRƯỚC động từ thường.",
    2: "⚠️ Lỗi thường gặp: Đặt trạng từ tần suất sai vị trí. Nhớ: SAU động từ 'to be'.",
    3: "⚠️ Lỗi thường gặp: Dùng sai thì khi hỏi về tần suất. 'How often' phải dùng Hiện tại đơn.",
    4: "⚠️ Lỗi thường gặp: Quên thêm 's/es' cho động từ khi chủ ngữ là số ít (ngôi thứ 3) ở Hiện tại đơn.",
    5: "⚠️ Lỗi thường gặp: Không chia động từ theo đúng lịch trình (Present Simple).",
    6: "⚠️ Lỗi thường gặp: Không nhận ra dấu hiệu 'at the moment' để dùng Hiện tại tiếp diễn.",
    7: "⚠️ Lỗi thường gặp: Thêm '-ing' vào động từ trạng thái (know, want...). Các từ này KHÔNG dùng ở thì tiếp diễn.",
    8: "⚠️ Lỗi thường gặp: Không thuộc động từ bất quy tắc (go -> went).",
    9: "⚠️ Lỗi thường gặp: Thêm '-ed' vào động từ sau 'didn't'. Sau 'didn't' động từ phải ở dạng nguyên mẫu.",
    10: "⚠️ Lỗi thường gặp: Thêm '-ed' vào động từ trong câu hỏi. Sau 'Did' động từ phải ở dạng nguyên mẫu.",
    11: "⚠️ Lỗi thường gặp: Chia sai đuôi '-ed' với từ kết thúc bằng 'y'. Nhớ đổi y -> ied.",
    12: "⚠️ Lỗi thường gặp: Dùng sai từ để hỏi thông tin (What, Who...).",
    13: "⚠️ Lỗi thường gặp: Dùng sai từ để hỏi nơi chốn (Where).",
    14: "⚠️ Lỗi thường gặp: Dùng sai trợ động từ khi đưa ra yêu cầu giúp đỡ. Dùng 'Can' hoặc 'Could'.",
    15: "⚠️ Lỗi thường gặp: Chia sai động từ to-be ở quá khứ (was/were).",
    16: "⚠️ Lỗi thường gặp: Không phân biệt được hành động ĐANG diễn ra (Quá khứ tiếp diễn) bị xen vào.",
    17: "⚠️ Lỗi thường gặp: Dùng 'while' thay cho 'when' trước hành động xen vào (quá khứ đơn).",
    18: "⚠️ Lỗi thường gặp: Dùng 'anything' trong câu khẳng định. Khẳng định phải dùng 'something'.",
    19: "⚠️ Lỗi thường gặp: Dùng 'something' trong câu phủ định. Phủ định phải dùng 'anything'.",
    20: "⚠️ Lỗi thường gặp: Phủ định kép. 'Nothing' bản thân nó đã mang nghĩa phủ định.",
    21: "⚠️ Lỗi thường gặp: Chia động từ số nhiều cho 'Everyone'. Các đại từ này luôn đi với động từ SỐ ÍT.",
    22: "⚠️ Lỗi thường gặp: Nhầm lẫn 'will' và 'be going to'. Kế hoạch đã định trước dùng 'be going to'.",
    23: "⚠️ Lỗi thường gặp: Viết sai cấu trúc phủ định của 'be going to'.",
    24: "⚠️ Lỗi thường gặp: Dùng 'be going to' cho Lời hứa. Lời hứa phải dùng 'will/won't'.",
    25: "⚠️ Lỗi thường gặp: Dùng 'be going to' cho Lời đề nghị. Đề nghị giúp đỡ phải dùng 'will'.",
    26: "⚠️ Lỗi thường gặp: Dùng 'be going to' cho Quyết định đột ngột lúc nói. Phải dùng 'will'.",
    27: "⚠️ Lỗi thường gặp: Dùng thì Tương lai ('will') trong mệnh đề 'If'. Mệnh đề 'If' dùng Hiện tại đơn.",
    28: "⚠️ Lỗi thường gặp: Thiếu 'to-be' hoặc 'to' trong cấu trúc 'be going to'.",
    29: "⚠️ Lỗi thường gặp: Dùng 'will' trong câu điều kiện loại 0 (sự thật hiển nhiên).",
    30: "⚠️ Lỗi thường gặp: Không chia đúng thì hiện tại đơn cho quy luật máy móc (loại 0).",
    31: "⚠️ Lỗi thường gặp: Phủ định sai cấu trúc trong câu điều kiện loại 1.",
    32: "⚠️ Lỗi thường gặp: Chia sai vế 'If' của câu điều kiện loại 1 (phải là Hiện tại đơn).",
    33: "⚠️ Lỗi thường gặp: Dùng 'more' với tính từ ngắn. Tính từ 1 âm tiết chỉ thêm '-er'.",
    34: "⚠️ Lỗi thường gặp: Nhầm lẫn so sánh hơn và so sánh nhất. Có 'the' thì phải là so sánh nhất.",
    35: "⚠️ Lỗi thường gặp: Dùng 'least' hoặc 'few' thay cho 'less' trong so sánh ít hơn.",
    36: "⚠️ Lỗi thường gặp: Dùng quá khứ đơn thay vì Hiện tại hoàn thành khi hỏi về trải nghiệm (ever).",
    37: "⚠️ Lỗi thường gặp: Dùng 'ever' trong câu phủ định mang nghĩa chưa bao giờ (dùng 'never').",
    38: "⚠️ Lỗi thường gặp: Thiếu 'have/has' trong cấu trúc 'the best... I have ever...'.",
    39: "⚠️ Lỗi thường gặp: Dùng 'to V' sau 'practise/enjoy/mind'. Các từ này đi với 'V-ing'.",
    40: "⚠️ Lỗi thường gặp: Dùng 'V-ing' sau 'need/want/decide'. Các từ này đi với 'to V'.",
    41: "⚠️ Lỗi thường gặp: Thiếu 'to' trong cấu trúc 'persuade/ask someone to do something'.",
    42: "⚠️ Lỗi thường gặp: Không nhớ rằng 'start' có thể đi với cả 'to V' và 'V-ing'.",
    43: "⚠️ Lỗi thường gặp: Dùng 'which' thay thế cho Người. Phải dùng 'who'.",
    44: "⚠️ Lỗi thường gặp: Dùng 'who' thay thế cho Vật. Phải dùng 'which'.",
    45: "⚠️ Lỗi thường gặp: Dùng 'which' cho Nơi chốn. Phải dùng 'where'.",
    46: "⚠️ Lỗi thường gặp: Nhầm lẫn ngữ cảnh của các tính từ miêu tả tính cách.",
    47: "⚠️ Lỗi thường gặp: Nhầm lẫn tên các môn học trong tiếng Anh.",
    48: "⚠️ Lỗi thường gặp: Nhầm lẫn các chế độ ăn uống (vegetarian vs vegan).",
    49: "⚠️ Lỗi thường gặp: Nhầm lẫn giữa 'prize', 'reward' và 'challenge'.",
    50: "⚠️ Lỗi thường gặp: Dùng 'very' với tính từ cực cấp (spectacular, awful...).",
};

function createQuestion(text, tText, correctOption, correctTrans, wrongOptions, wrongTransList, exp, unit, orderIndex, setNumber) {
    const opts = [
        { text: correctOption, trans: correctTrans, isCorrect: true },
        { text: wrongOptions[0], trans: wrongTransList[0], isCorrect: false },
        { text: wrongOptions[1], trans: wrongTransList[1], isCorrect: false },
        { text: wrongOptions[2], trans: wrongTransList[2], isCorrect: false }
    ];
    for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    let correctLetter = 'A';
    const finalOptions = {};
    const finalTrans = {};
    const letters = ['A', 'B', 'C', 'D'];
    opts.forEach((o, index) => {
        finalOptions[letters[index]] = o.text;
        finalTrans[letters[index]] = o.trans;
        if (o.isCorrect) correctLetter = letters[index];
    });
    return {
        questionText: text, options: finalOptions, correctAnswer: correctLetter,
        explanation: exp, vietnameseTranslation: tText, optionTranslations: finalTrans,
        unit: unit.split(':')[0].trim(), orderIndex, setNumber,
        commonMistake: commonMistakes[orderIndex]
    };
}

function parseAndPush(setIdx, qText, tText, correct, cT, wrongArr, wTArr, exp, unit, orderIndex) {
    allQuestions.push(createQuestion(qText, tText, correct, cT, wrongArr, wTArr, exp, unit, orderIndex, setIdx));
}

for (let setIdx = 1; setIdx <= 10; setIdx++) {
    const i = setIdx - 1; 

    const s = subjects[i];
    const adv = advs[i];
    const advVi = advsVi[i];

    // Q1
    let p1 = q1_list[i].split('|');
    let vPhrase = s.p || s.en==='I'||s.en==='You' ? p1[0] : p1[0].replace(p1[2], p1[3]);
    parseAndPush(setIdx, `${s.en} _______ ${vPhrase}.`, `${s.vi} _______ ${p1[1]}.`, adv, advVi, [`don't ${adv}`, `am ${adv}`, `${adv} am`], ["sai", "sai", "sai"], "Adverbs of frequency đứng TRƯỚC động từ thường.", "Unit 1", 1);

    // Q2
    let p2 = q2_list[i].split('|');
    parseAndPush(setIdx, `${s.en} _______ ${p2[0]}.`, `${s.vi} _______ ${p2[1]}.`, `${s.be} ${adv}`, `${advVi}`, [`${adv} ${s.be}`, `be ${adv}`, `${adv} be`], ["sai vị trí", "sai động từ be", "sai cấu trúc"], "Adverbs of frequency đứng SAU động từ 'to be'.", "Unit 1", 2);

    // Q3
    let p3 = q3_list[i].split('|');
    parseAndPush(setIdx, `How _______ do you ${p3[0]}?`, `Bạn có _______ ${p3[1]} không?`, "often", "thường xuyên", ["many", "much", "long"], ["nhiều", "nhiều", "bao lâu"], "Dùng 'How often...?' để hỏi về tần suất.", "Unit 1", 3);

    // Q4
    let p4 = q4_list[i].split('|');
    parseAndPush(setIdx, `${p4[0]} _______ ${p4[2]}.`, `Sự thật: ${p4[3]} _______ ${p4[5]}.`, p4[1], p4[4], [p4[7], `is ${p4[1]}`, p4[8]], ["nguyên thể", "đang", "tiếp diễn"], "Sự thật hiển nhiên dùng thì Hiện tại đơn.", "Unit 1", 4);

    // Q5
    let p5 = q5_list[i].split('|');
    parseAndPush(setIdx, `${p5[0]} _______ ${p5[2]}.`, `${p5[3]} _______ ${p5[5]}.`, p5[1], p5[4], [p5[1].replace('s',''), `is ${p5[1].replace('s','')}`, p5[1].replace('s','ed')], ["nguyên thể", "đang", "đã"], "Lịch trình tàu xe dùng thì Hiện tại đơn.", "Unit 1", 5);

    // Q6
    let p6 = q6_list[i].split('|');
    parseAndPush(setIdx, `${s.en} _______ ${p6[0].replace(p6[2],'')} at the moment.`, `${s.vi} _______ ${p6[1]} vào lúc này.`, `${s.be} ${p6[3]}`, `đang ${p6[2]}`, [p6[2], p6[2]+'s', p6[3]], ["hiện tại", "hiện tại", "thiếu be"], "Dấu hiệu 'at the moment' dùng thì Hiện tại tiếp diễn.", "Unit 1", 6);

    // Q7
    let p7 = q7_list[i].split('|');
    let v7 = s.p || s.en==='I' ? p7[2] : p7[3];
    parseAndPush(setIdx, `${s.en} _______ ${p7[0].replace(p7[2],'')}.`, `${s.vi} _______ ${p7[1]}.`, v7, "đúng", [`${s.be} ${p7[4]}`, p7[5], `was ${p7[4]}`], ["đang (sai)", "đã", "đã đang"], "Động từ trạng thái (stative verb) KHÔNG dùng ở thì tiếp diễn.", "Unit 1", 7);

    // Q8
    let p8 = q8_list[i].split('|');
    parseAndPush(setIdx, `Yesterday, ${s.en} _______ ${p8[0].replace(p8[4],'')}.`, `Hôm qua, ${s.vi} _______ ${p8[1]}.`, p8[4], `đã ${p8[2]}`, [p8[2], p8[3], `${s.pastBe} ${p8[5]}`], ["hiện tại", "hiện tại", "tiếp diễn"], "Dấu hiệu 'Yesterday' dùng thì Quá khứ đơn.", "Unit 2", 8);

    // Q9
    let p9 = q9_list[i].split('|');
    parseAndPush(setIdx, `${s.en} _______ ${p9[0]}.`, `${s.vi} _______ ${p9[1]}.`, "didn't", "đã không", ["don't", "doesn't", "wasn't"], ["không", "không", "không phải"], "Câu phủ định quá khứ đơn với động từ thường dùng 'didn't'.", "Unit 2", 9);

    // Q10
    let p10 = q10_list[i].split('|');
    parseAndPush(setIdx, `_______ you ${p10[0]} yesterday?`, `Bạn _______ ${p10[1]} ngày hôm qua không?`, "Did", "Quá khứ", ["Do", "Were", "Are"], ["Hiện tại", "Quá khứ to-be", "Hiện tại to-be"], "Câu hỏi Yes/No quá khứ đơn dùng 'Did'.", "Unit 2", 10);

    // Q11
    let p11 = q11_list[i].split('|');
    parseAndPush(setIdx, `${s.en} _______ ${p11[0].replace(p11[1],'')} last night.`, `${s.vi} _______ ${p11[1]} tối qua.`, p11[2], "đã", [p11[3], p11[4], p11[1]+'ys'], ["nguyên thể", "hiện tại", "sai chính tả"], "Động từ tận cùng bằng phụ âm + y, đổi y thành ied.", "Unit 2", 11);

    // Q12
    let p12 = q12_list[i].split('|');
    parseAndPush(setIdx, `_______ is your ${p12[0]}?`, `${p12[1]} của bạn là _______?`, "What", "Cái gì", ["Where", "Who", "When"], ["Ở đâu", "Ai", "Khi nào"], "Hỏi về thông tin dùng 'What'.", "Unit 2", 12);

    // Q13
    let p13 = q13_list[i].split('|');
    parseAndPush(setIdx, `_______ did they ${p13[0]}`, `Họ đã _______ ${p13[1]}`, "Where", "Ở đâu", ["When", "Why", "Who"], ["Khi nào", "Tại sao", "Ai"], "Câu trả lời chỉ nơi chốn nên dùng từ để hỏi 'Where'.", "Unit 2", 13);

    // Q14
    let p14 = q14_list[i].split('|');
    parseAndPush(setIdx, `_______ you ${p14[0]}?`, `Bạn _______ ${p14[1]} được không?`, "Can", "Có thể", ["Are", "Do", "Have"], ["Là", "Làm", "Có"], "Yêu cầu giúp đỡ dùng 'Can' hoặc 'Could'.", "Unit 2", 14);

    // Q15
    let p15 = q15_list[i].split('|');
    parseAndPush(setIdx, `${s.en} _______ ${p15[0]} at 8 PM.`, `${s.vi} _______ ${p15[1]} lúc 8 giờ tối.`, `${s.pastBe} ${p15[0].split(' ')[0]}ing`, "đang", [s.pastBe==='was'?'were':'was', "are", "did"], ["sai to-be", "hiện tại", "quá khứ"], "Dùng thì Quá khứ tiếp diễn cho hành động đang xảy ra tại một thời điểm trong quá khứ.", "Unit 3", 15);

    // Q16
    let p16 = q16_list[i].split('|');
    parseAndPush(setIdx, p16[0], p16[1], p16[2], "đang", [p16[2].split(' ')[1].replace('ing','e'), p16[2].split(' ')[1].replace('ing','ed'), p16[2].replace('was','is').replace('were','are')], ["nguyên thể", "quá khứ", "hiện tại"], "Hành động đang diễn ra trong quá khứ bị gián đoạn dùng Quá khứ tiếp diễn.", "Unit 3", 16);

    // Q17
    let p17 = q17_list[i].split('|');
    parseAndPush(setIdx, p17[0], p17[1], "when", "khi", ["while", "during", "so"], ["trong khi", "trong suốt", "vì vậy"], "Dùng 'when' trước hành động gián đoạn ở thì Quá khứ đơn.", "Unit 3", 17);

    // Q18
    let p18 = q18_list[i].split('|');
    parseAndPush(setIdx, `I want to ${p18[0]}`, `Tôi muốn ${p18[1]}`, "something/someone/somewhere", "đại từ bất định khẳng định", ["anything", "nothing", "everything"], ["bất cứ", "không", "mọi thứ"], "Trong câu khẳng định, dùng đại từ bất định some-.", "Unit 3", 18);

    // Q19
    let p19 = q19_list[i].split('|');
    parseAndPush(setIdx, `I didn't ${p19[0]}.`, `Tôi đã không ${p19[1]}.`, "anything/anyone/anywhere", "đại từ phủ định", ["something", "nothing", "everything"], ["khẳng định", "phủ định kép", "mọi thứ"], "Trong câu phủ định, dùng đại từ bất định any-.", "Unit 3", 19);

    // Q20
    let p20 = q20_list[i].split('|');
    parseAndPush(setIdx, `There is ${p20[0]}.`, `Không có ${p20[1]}.`, "nothing/no one/nowhere", "nghĩa phủ định", ["anything", "something", "everything"], ["bất cứ", "một vài", "mọi"], "'Nothing/No one/Nowhere' mang nghĩa phủ định, động từ chia ở khẳng định.", "Unit 3", 20);

    // Q21
    let p21 = q21_list[i].split('|');
    parseAndPush(setIdx, p21[0], p21[1], "Everyone/Everything", "Mọi người/Mọi thứ", ["Anyone", "All", "Some"], ["Bất cứ", "Tất cả", "Một vài"], "Đại từ 'Everyone/Everything' dùng với động từ số ít.", "Unit 3", 21);

    // Q22
    let p22 = q22_list[i].split('|');
    parseAndPush(setIdx, `${s.en} _______ ${p22[0]}.`, `${s.vi} _______ ${p22[1]}.`, `${s.be} going to`, "dự định", ["will to", "going to", `${s.be} going`], ["sai", "thiếu be", "thiếu to"], "Nói về một kế hoạch dùng cấu trúc 'be going to'.", "Unit 4", 22);

    // Q23
    let p23 = q23_list[i].split('|');
    let negBe = s.be === 'am' ? "am not" : (s.be === 'is' ? "isn't" : "aren't");
    parseAndPush(setIdx, `${s.en} _______ ${p23[0]}.`, `${s.vi} _______ ${p23[1]}.`, `${negBe} going to`, "không dự định", ["not going to", "won't going to", "don't going to"], ["thiếu be", "sai", "sai"], "Phủ định của 'be going to'.", "Unit 4", 23);

    // Q24
    let p24 = q24_list[i].split('|');
    parseAndPush(setIdx, `I promise I _______ ${p24[0]}.`, `Tôi hứa tôi _______ ${p24[1]}.`, "won't", "sẽ không", ["don't", "not", "am not going to"], ["không", "không", "không dự định"], "Lời hứa dùng 'won't'.", "Unit 4", 24);

    // Q25
    let p25 = q25_list[i].split('|');
    parseAndPush(setIdx, `Don't worry, I _______ ${p25[0]}.`, `Đừng lo, tôi _______ ${p25[1]}.`, "will", "sẽ", ["am going to", "do", "am"], ["dự định", "làm", "đang"], "Đề nghị giúp đỡ (Offer) dùng 'will'.", "Unit 4", 25);

    // Q26
    let p26 = q26_list[i].split('|');
    parseAndPush(setIdx, `Okay, I _______ ${p26[0]}.`, `Được rồi, tôi _______ ${p26[1]}.`, "will", "sẽ", ["am going to", "do", "am doing"], ["dự định", "làm", "đang làm"], "Quyết định đột ngột lúc nói dùng 'will'.", "Unit 4", 26);

    // Q27
    let p27 = q27_list[i].split('|');
    parseAndPush(setIdx, p27[0], `Nếu ${p27[1]}, ...`, p27[2], "hiện tại", [p27[3], p27[4], p27[5]], ["quá khứ (sai)", "tương lai (sai)", "tiếp diễn (sai)"], `KHÔNG dùng 'will' trong mệnh đề 'If'. Mệnh đề điều kiện loại 1 dùng Hiện tại đơn. Đáp án đúng: '${p27[2]}'.`, "Unit 4", 27);

    // Q28
    let p28 = q28_list[i].split('|');
    parseAndPush(setIdx, p28[0], `Kế hoạch: ${p28[1]}`, "going to", "dự định", ["going", "go to", "will"], ["đang", "đi", "sẽ"], "Cấu trúc am/is/are + going to + V.", "Unit 4", 28);

    // Q29 - fixed wrong options to avoid auto-generated duplicates
    let p29 = q29_list[i].split('|');
    parseAndPush(setIdx, `If you ${p29[0]}, _______ .`, `Nếu bạn ${p29[0]}, _______ .`, p29[1], p29[2], [`will happen`, `might happen`, `is happening`], ["tương lai (sai)", "có thể (sai)", "đang diễn ra (sai)"], `Câu điều kiện loại 0 diễn tả sự thật hiển nhiên. Cả 2 vế đều dùng Hiện tại đơn. Đáp án đúng là '${p29[1]}'.`, "Unit 5", 29);

    // Q30 - fixed wrong options to avoid auto-generated duplicates
    let p30 = q30_list[i].split('|');
    parseAndPush(setIdx, `If ${p30[0]}, _______ .`, `Nếu ${p30[0]}, _______ .`, p30[1], p30[2], [`will happen`, `might happen`, `is happening`], ["tương lai (sai)", "có thể (sai)", "đang diễn ra (sai)"], `Câu điều kiện loại 0 chỉ quy luật máy móc. Cả 2 vế đều dùng Hiện tại đơn. Đáp án đúng là '${p30[1]}'.`, "Unit 5", 30);

    // Q31
    let p31 = q31_list[i].split('|');
    parseAndPush(setIdx, `If it ${p31[0]}, _______.`, `Nếu trời ${p31[0]}, _______.`, p31[1], p31[2], [p31[1].replace("won't", "don't"), p31[1].replace("won't", "didn't"), p31[1].replace("won't", "aren't")], ["không", "đã không", "không phải"], "Câu điều kiện loại 1: If + HTĐ, will/won't + V.", "Unit 5", 31);

    // Q32
    let p32 = q32_list[i].split('|');
    parseAndPush(setIdx, p32[0], `Nếu ${p32[1]}`, p32[2], "hiện tại", [p32[3], p32[4], p32[5]], ["quá khứ", "sẽ", "tiếp diễn"], "Mệnh đề If loại 1 dùng Hiện tại đơn.", "Unit 5", 32);

    // Q33 - embed adjective in sentence to make each unique
    let p33 = q33_list[i].split('|');
    parseAndPush(setIdx, `My phone is _______ than yours. (${p33[0]})`, `Điện thoại của tôi _______ của bạn. (${p33[0]})`, p33[1], p33[2], [p33[0], `most ${p33[0]}`, `more ${p33[0]}`], ["nguyên thể", "so sánh nhất (sai)", "so sánh hơn (sai cấu trúc)"], `So sánh hơn của tính từ ngắn '${p33[0]}': thêm -er. KHÔNG dùng 'more'.`, "Unit 5", 33);

    // Q34 - embed adjective in sentence to make each unique
    let p34 = q34_list[i].split('|');
    parseAndPush(setIdx, `That was the _______ experience of my life. (${p34[0]})`, `Đó là trải nghiệm _______ của cuộc đời tôi. (${p34[0]})`, p34[1], p34[2], [p34[0], `more ${p34[0]}`, `${p34[0]}er`], ["nguyên thể", "so sánh hơn (sai)", "so sánh nhất (sai cấu trúc)"], `So sánh nhất của tính từ dài '${p34[0]}': dùng 'most ${p34[0]}'. KHÔNG thêm -er.`, "Unit 5", 34);

    // Q35
    let p35 = q35_list[i].split('|');
    parseAndPush(setIdx, `It is _______ ${p35[0]} than before.`, `Nó thì ít _______ hơn trước.`, "less", "ít hơn", ["least", "little", "few"], ["ít nhất", "ít", "vài"], "So sánh ít hơn dùng less + tính từ dài + than.", "Unit 5", 35);

    // Q36
    let p36 = q36_list[i].split('|');
    parseAndPush(setIdx, p36[0], `_______ bạn đã từng...`, p36[1], "HT hoàn thành", [p36[2], p36[3], p36[4]], ["HT", "QK", "to-be"], "Hỏi về trải nghiệm dùng Hiện tại hoàn thành.", "Unit 6", 36);

    // Q37
    let p37 = q37_list[i].split('|');
    parseAndPush(setIdx, `I've _______ ${p37[0]}.`, `Tôi chưa bao giờ ${p37[1]}.`, "never", "chưa bao giờ", ["ever", "always", "sometimes"], ["từng", "luôn", "thỉnh thoảng"], "Trong câu khẳng định mang nghĩa chưa từng, dùng 'never'.", "Unit 6", 37);

    // Q38
    let p38 = q38_list[i].split('|');
    parseAndPush(setIdx, `This is the best ${p38[0]}`, `Đây là ${p38[1]} tốt nhất tôi từng ${p38[2]}.`, "ever", "từng", ["never", "always", "just"], ["chưa từng", "luôn", "vừa mới"], "Dùng ever trong câu so sánh nhất.", "Unit 6", 38);

    // Q39
    let p39 = q39_list[i].split('|');
    parseAndPush(setIdx, p39[0], `V-ing sau động từ.`, p39[1], "V-ing", [p39[2], p39[3], `is ${p39[1]}`], ["V", "to V", "sai"], "Dùng V-ing sau các động từ như practise, enjoy, mind...", "Unit 6", 39);

    // Q40
    let p40 = q40_list[i].split('|');
    parseAndPush(setIdx, p40[0], `to V sau động từ.`, p40[1], "to V", [p40[2], p40[3], `is ${p40[3]}`], ["V", "V-ing", "sai"], "Dùng to-infinitive sau need, want, decide...", "Unit 6", 40);

    // Q41
    let p41 = q41_list[i].split('|');
    parseAndPush(setIdx, p41[0], `persuade/ask/want + sb + to V`, p41[1], "to V", [p41[2], p41[3], `is ${p41[3]}`], ["V", "V-ing", "sai"], "Cấu trúc: verb + object + to V.", "Unit 6", 41);

    // Q42
    let p42 = q42_list[i].split('|');
    parseAndPush(setIdx, `I started learning ${p42[0]}.`, `Tôi bắt đầu học ${p42[1]}.`, "Both B & C", "Cả 2 đều đúng", ["learn", "to learn", "learning"], ["V", "to V", "V-ing"], "Sau start có thể dùng cả to V và V-ing.", "Unit 6", 42);

    // Q43
    let p43 = q43_list[i].split('|');
    parseAndPush(setIdx, p43[0], p43[1], "who", "người", ["which", "where", "when"], ["vật", "nơi", "thời gian"], "Đại từ 'who' thay thế danh từ chỉ người.", "Unit 6", 43);

    // Q44
    let p44 = q44_list[i].split('|');
    parseAndPush(setIdx, p44[0], p44[1], "which", "vật", ["who", "where", "when"], ["người", "nơi", "thời gian"], "Đại từ 'which' thay thế danh từ chỉ vật.", "Unit 6", 44);

    // Q45
    let p45 = q45_list[i].split('|');
    parseAndPush(setIdx, `That is ${p45[0]}.`, `Đó là ${p45[1]}.`, "where", "nơi chốn", ["which", "who", "when"], ["vật", "người", "thời gian"], "Đại từ 'where' thay thế danh từ chỉ nơi chốn.", "Unit 6", 45);

    // Q46 - use unique wrong options that don't overlap with answer
    let p46 = q46_list[i].split('|');
    const q46allWords = ['serious','confident','friendly','honest','patient','reliable','creative','professional'];
    const q46wrong = q46allWords.filter(w => w !== p46[2]).slice(0,3);
    const q46wrongVi = {serious:'nghiêm túc',confident:'tự tin',friendly:'thân thiện',honest:'trung thực',patient:'kiên nhẫn',reliable:'đáng tin cậy',creative:'sáng tạo',professional:'chuyên nghiệp'};
    parseAndPush(setIdx, `He is very _______ because he ${p46[0]}.`, `Anh ấy rất _______ vì anh ấy ${p46[1]}.`, p46[2], p46[3], q46wrong, q46wrong.map(w=>q46wrongVi[w]||w), `Từ vựng Personality: '${p46[2]}' (${p46[3]}) phù hợp với ngữ cảnh '${p46[0]}'.`, "Vocabulary", 46);

    // Q47 - use unique wrong options that don't overlap with answer
    let p47 = q47_list[i].split('|');
    const q47allWords = ['drama','art','biology','maths','physics','history','geography','chemistry','IT','PE'];
    const q47wrong = q47allWords.filter(w => w !== p47[2]).slice(0,3);
    const q47wrongVi = {drama:'kịch',art:'mỹ thuật',biology:'sinh học',maths:'toán',physics:'vật lý',history:'lịch sử',geography:'địa lý',chemistry:'hóa học',IT:'tin học',PE:'thể dục'};
    parseAndPush(setIdx, `We learn about ${p47[0]} in _______ class.`, `Chúng tôi học về ${p47[1]} trong lớp _______.`, p47[2], p47[3], q47wrong, q47wrong.map(w=>q47wrongVi[w]||w), `Từ vựng School Subjects: '${p47[2]}' (${p47[3]}) được học qua chủ đề '${p47[0]}'.`, "Vocabulary", 47);

    // Q48 - use unique wrong options that don't overlap with answer
    let p48 = q48_list[i].split('|');
    const q48wrong = ['vegetarian','vegan','allergy','delicious','dish','raw','prepare','serve'].filter(w => w !== p48[2]).slice(0,3);
    const q48wrongVi = {vegetarian:'ăn chay',vegan:'thuần chay',allergy:'dị ứng',delicious:'ngon',dish:'món ăn',raw:'sống',prepare:'chuẩn bị',serve:'phục vụ'};
    parseAndPush(setIdx, `He _______, so he is a ${p48[2]}.`, `Anh ấy ${p48[1]}, nên anh ấy là ${p48[3]}.`, p48[2], p48[3], q48wrong, q48wrong.map(w=>q48wrongVi[w]||w), `Từ vựng Food: '${p48[2]}' có nghĩa là ${p48[3]}.`, "Vocabulary", 48);

    // Q49 - use unique wrong options that don't overlap with answer
    let p49 = q49_list[i].split('|');
    const q49wrong = ['challenge','encourage','praise','prize','punish','purpose','reward'].filter(w => w !== p49[2]).slice(0,3);
    const q49wrongVi = {challenge:'thử thách',encourage:'khuyến khích',praise:'lời khen',prize:'giải thưởng',punish:'phạt',purpose:'mục đích',reward:'phần thưởng'};
    parseAndPush(setIdx, `I like the _______ of ${p49[0]}.`, `Tôi thích _______ của việc ${p49[1]}.`, p49[2], p49[3], q49wrong, q49wrong.map(w=>q49wrongVi[w]||w), `Từ vựng Motivation: '${p49[2]}' có nghĩa là ${p49[3]}.`, "Vocabulary", 49);

    // Q50 - dynamic wrong options that never clash with the correct answer
    let p50 = q50_list[i].split('|');
    const q50allAdj = ['spectacular','awful','brilliant','disgusting','enormous','filthy','freezing','tiny','amazing','boiling'];
    const q50adjVi = {spectacular:'ngoạn mục',awful:'tệ hại',brilliant:'tuyệt vời',disgusting:'kinh tởm',enormous:'khổng lồ',filthy:'bẩn thỉu',freezing:'lạnh cóng',tiny:'nhỏ bé',amazing:'tuyệt vời',boiling:'cực nóng'};
    const q50wrong = q50allAdj.filter(w => w !== p50[2]).slice(0,3);
    parseAndPush(setIdx, `The ${p50[0]} is _______.`, `${p50[1]} thì _______.`, p50[2], p50[3], q50wrong, q50wrong.map(w=>q50adjVi[w]||w), `Từ vựng Extreme Adjectives: '${p50[2]}' (${p50[3]}) là tính từ cực cấp. KHÔNG dùng 'very' với các từ này.`, "Vocabulary", 50);
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Question.deleteMany({});
        console.log('Cleared existing questions');

        await Question.insertMany(allQuestions);
        console.log(`Successfully seeded ${allQuestions.length} unique diverse questions`);

        await mongoose.connection.close();
        console.log('Database connection closed');
        
        fs.writeFileSync('./seed-all-500.js', `// Generated file\nconst questions = ${JSON.stringify(allQuestions, null, 2)};\nmodule.exports = questions;`);
        console.log('Also wrote to seed-all-500.js for backup');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
