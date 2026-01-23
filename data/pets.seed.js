const { connectToDatabase, getDb } = require("../config/database");

// 20 Pet Items for Seeding
const pets = [
    {
        name: "Buddy",
        breed: "Golden Retriever",
        age: 2,
        price: 899.99,
        category: "dog",
        description: "Friendly, loyal, and great with families. Loves to play fetch and swim.",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500",
        inStock: true,
    },
    {
        name: "Luna",
        breed: "Siamese Cat",
        age: 1,
        price: 599.99,
        category: "cat",
        description: "Elegant and vocal. Loves attention and is very affectionate.",
        image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500",
        inStock: true,
    },
    {
        name: "Max",
        breed: "German Shepherd",
        age: 3,
        price: 1199.99,
        category: "dog",
        description: "Intelligent, loyal, and protective. Excellent guard dog and family companion.",
        image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500",
        inStock: true,
    },
    {
        name: "Milo",
        breed: "Orange Tabby",
        age: 2,
        price: 449.99,
        category: "cat",
        description: "Playful and curious. Loves to explore and is great with kids.",
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500",
        inStock: true,
    },
    {
        name: "Charlie",
        breed: "French Bulldog",
        age: 1,
        price: 1499.99,
        category: "dog",
        description: "Compact, cute, and full of personality. Perfect apartment companion.",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
        inStock: true,
    },
    {
        name: "Coco",
        breed: "Persian Cat",
        age: 2,
        price: 799.99,
        category: "cat",
        description: "Fluffy, calm, and regal. Loves to be brushed and pampered.",
        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
        inStock: true,
    },
    {
        name: "Rocky",
        breed: "Boxer",
        age: 4,
        price: 749.99,
        category: "dog",
        description: "Energetic and playful. Great with children and very loyal.",
        image: "https://images.unsplash.com/photo-1543071220-6ee5bf694b7d?w=500",
        inStock: true,
    },
    {
        name: "Tweety",
        breed: "Canary",
        age: 1,
        price: 149.99,
        category: "bird",
        description: "Beautiful yellow singer. Brings joy with its melodious songs.",
        image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=500",
        inStock: true,
    },
    {
        name: "Daisy",
        breed: "Beagle",
        age: 2,
        price: 699.99,
        category: "dog",
        description: "Gentle and curious. Great scent hound and wonderful family pet.",
        image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500",
        inStock: true,
    },
    {
        name: "Shadow",
        breed: "Black Cat",
        age: 3,
        price: 399.99,
        category: "cat",
        description: "Mysterious and loving. Sleek black fur with golden eyes.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
        inStock: true,
    },
    {
        name: "Sunny",
        breed: "Cockatiel",
        age: 2,
        price: 249.99,
        category: "bird",
        description: "Friendly and whistling. Loves to mimic sounds and interact.",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500",
        inStock: true,
    },
    {
        name: "Bear",
        breed: "Newfoundland",
        age: 5,
        price: 1599.99,
        category: "dog",
        description: "Gentle giant. Great with kids and excellent swimmer.",
        image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500",
        inStock: false,
    },
    {
        name: "Whiskers",
        breed: "Maine Coon",
        age: 3,
        price: 999.99,
        category: "cat",
        description: "Large, fluffy, and friendly. One of the biggest domestic cat breeds.",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500",
        inStock: true,
    },
    {
        name: "Oreo",
        breed: "Border Collie",
        age: 2,
        price: 849.99,
        category: "dog",
        description: "Highly intelligent and energetic. Needs lots of exercise and mental stimulation.",
        image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=500",
        inStock: true,
    },
    {
        name: "Kiwi",
        breed: "Parakeet",
        age: 1,
        price: 89.99,
        category: "bird",
        description: "Small, colorful, and social. Great starter bird for beginners.",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
        inStock: true,
    },
    {
        name: "Simba",
        breed: "Labrador Retriever",
        age: 1,
        price: 799.99,
        category: "dog",
        description: "Friendly, outgoing, and high-spirited. America's favorite breed.",
        image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=500",
        inStock: true,
    },
    {
        name: "Bella",
        breed: "Ragdoll",
        age: 2,
        price: 899.99,
        category: "cat",
        description: "Docile, affectionate, and beautiful. Blue eyes with silky fur.",
        image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=500",
        inStock: true,
    },
    {
        name: "Rio",
        breed: "Macaw",
        age: 4,
        price: 2999.99,
        category: "bird",
        description: "Stunningly beautiful and intelligent. Can learn to talk and live long.",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500",
        inStock: true,
    },
    {
        name: "Duke",
        breed: "Husky",
        age: 3,
        price: 1099.99,
        category: "dog",
        description: "Energetic, outgoing, and mischievous. Beautiful blue eyes and thick coat.",
        image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=500",
        inStock: true,
    },
    {
        name: "Nala",
        breed: "Bengal Cat",
        age: 2,
        price: 1299.99,
        category: "cat",
        description: "Exotic appearance with leopard-like spots. Active, playful, and vocal.",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500",
        inStock: true,
    },
];

/**
 * Seed pets to MongoDB
 */
async function seedPets() {
    try {
        console.log("Connecting to MongoDB...");
        await connectToDatabase();

        const db = getDb();
        const collection = db.collection("pets");

        // Clear existing pets
        const deleteResult = await collection.deleteMany({});
        console.log(`Cleared ${deleteResult.deletedCount} existing pets`);

        // Insert new pets with timestamps
        const petsWithTimestamps = pets.map((pet) => ({
            ...pet,
            createdAt: new Date(),
        }));

        const insertResult = await collection.insertMany(petsWithTimestamps);
        console.log(`Successfully inserted ${insertResult.insertedCount} pets!`);

        console.log("\n🐾 Pet Database Seeded Successfully! 🐾\n");
    } catch (error) {
        console.error("Error seeding pets:", error);
        process.exit(1);
    }
}

// Run seed if executed directly
if (require.main === module) {
    seedPets()
        .then(() => {
            console.log("Seeding complete!");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Seeding failed:", error);
            process.exit(1);
        });
}

module.exports = { pets, seedPets };
