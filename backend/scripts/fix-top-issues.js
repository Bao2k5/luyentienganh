require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

// Top 10 critical fixes for INCONSISTENT_OPTIONS
const fixes = [
    {
        setNumber: 1,
        orderIndex: 29,
        updates: {
            questionText: "If you heat water to 100°C, it _______ .",
            options: {
                A: "might boil",
                B: "will boil",
                C: "boils",
                D: "is boiling"
            },
            explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên, quy luật tự nhiên. Cấu trúc: If + present simple, present simple. Cả hai mệnh đề đều dùng thì hiện tại đơn. Khi đun nước đến 100°C, nó luôn sôi. Đáp án C đúng: 'it boils'."
        }
    },
    {
        setNumber: 1,
        orderIndex: 30,
        updates: {
            questionText: "If the power is low, the red light _______ .",
            options: {
                A: "flashes",
                B: "is flashing",
                C: "might flash",
                D: "will flash"
            },
            explanation: "Câu điều kiện loại 0 diễn tả quy luật máy móc, sự thật luôn đúng. Cấu trúc: If + present simple, present simple. Khi pin yếu, đèn đỏ luôn nhấp nháy. Đáp án A đúng: 'the red light flashes'."
        }
    },
    {
        setNumber: 2,
        orderIndex: 29,
        updates: {
            questionText: "If you mix red and blue, you _______ purple.",
            options: {
                A: "get",
                B: "will get",
                C: "might get",
                D: "are getting"
            },
            explanation: "Câu điều kiện loại 0 diễn tả sự thật hiển nhiên. Khi trộn đỏ và xanh dương, luôn ra màu tím. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'you get purple'."
        }
    },
    {
        setNumber: 2,
        orderIndex: 30,
        updates: {
            questionText: "If you press this button, the machine _______ .",
            options: {
                A: "stops",
                B: "will stop",
                C: "might stop",
                D: "is stopping"
            },
            explanation: "Câu điều kiện loại 0 diễn tả quy luật máy móc. Khi nhấn nút này, máy luôn dừng. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'the machine stops'."
        }
    },
    {
        setNumber: 3,
        orderIndex: 29,
        updates: {
            questionText: "If ice gets warm, it _______ .",
            options: {
                A: "melts",
                B: "will melt",
                C: "might melt",
                D: "is melting"
            },
            explanation: "Câu điều kiện loại 0 diễn tả quy luật tự nhiên. Khi đá ấm lên, nó luôn tan chảy. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'it melts'."
        }
    },
    {
        setNumber: 3,
        orderIndex: 30,
        updates: {
            questionText: "If you add sugar to tea, it _______ sweet.",
            options: {
                A: "tastes",
                B: "will taste",
                C: "might taste",
                D: "is tasting"
            },
            explanation: "Câu điều kiện loại 0 diễn tả sự thật hiển nhiên. Khi thêm đường vào trà, nó luôn có vị ngọt. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'it tastes sweet'."
        }
    },
    {
        setNumber: 4,
        orderIndex: 29,
        updates: {
            questionText: "If you freeze water, it _______ ice.",
            options: {
                A: "becomes",
                B: "will become",
                C: "might become",
                D: "is becoming"
            },
            explanation: "Câu điều kiện loại 0 diễn tả quy luật tự nhiên. Khi đông đá nước, nó luôn thành đá. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'it becomes ice'."
        }
    },
    {
        setNumber: 4,
        orderIndex: 30,
        updates: {
            questionText: "If you touch fire, you _______ burned.",
            options: {
                A: "get",
                B: "will get",
                C: "might get",
                D: "are getting"
            },
            explanation: "Câu điều kiện loại 0 diễn tả sự thật hiển nhiên. Khi chạm vào lửa, bạn luôn bị bỏng. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'you get burned'."
        }
    },
    {
        setNumber: 5,
        orderIndex: 29,
        updates: {
            questionText: "If plants don't get water, they _______ .",
            options: {
                A: "die",
                B: "will die",
                C: "might die",
                D: "are dying"
            },
            explanation: "Câu điều kiện loại 0 diễn tả quy luật tự nhiên. Khi cây không có nước, chúng luôn chết. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'they die'."
        }
    },
    {
        setNumber: 5,
        orderIndex: 30,
        updates: {
            questionText: "If you drop a glass, it _______ .",
            options: {
                A: "breaks",
                B: "will break",
                C: "might break",
                D: "is breaking"
            },
            explanation: "Câu điều kiện loại 0 diễn tả sự thật hiển nhiên. Khi làm rơi ly, nó luôn vỡ. Cấu trúc: If + present simple, present simple. Đáp án A đúng: 'it breaks'."
        }
    }
];

const applyFixes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        let successCount = 0;
        let failCount = 0;

        for (const fix of fixes) {
            try {
                const question = await Question.findOne({
                    setNumber: fix.setNumber,
                    orderIndex: fix.orderIndex
                });

                if (!question) {
                    console.log(`❌ Question not found: Set ${fix.setNumber}, Order ${fix.orderIndex}`);
                    failCount++;
                    continue;
                }

                console.log(`\n📝 Updating Q${question.orderIndex} (Set ${fix.setNumber})`);
                console.log(`   Old: ${question.questionText}`);
                console.log(`   New: ${fix.updates.questionText}`);

                Object.assign(question, fix.updates);
                await question.save();

                console.log(`   ✅ Updated successfully`);
                successCount++;

            } catch (error) {
                console.log(`   ❌ Failed: ${error.message}`);
                failCount++;
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📊 SUMMARY');
        console.log('='.repeat(60));
        console.log(`Total fixes attempted: ${fixes.length}`);
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);

        await mongoose.disconnect();
        process.exit(failCount > 0 ? 1 : 0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

applyFixes();
