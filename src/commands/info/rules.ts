import { Message } from 'discord.js'

export const execute = async (message: Message): Promise<Message> => {
  return message.channel.send(
    `**ยินดีต้อนรับ สู่ครอบครัว The Toon**\n\n**กฎ:**\n\n1. ห้ามสแปม, ฟลัด, โฆษณา, การเมือง, ความรุนแรง, สื่อลามก หรือ สิ่งผิดกฎหมาย\n2. ห้ามใช้คำหยาบ หรือ คำไม่สุภาพ คุยกันแบบสุภาพชน\n3. ให้ความเคารพซึ่งกันและกันทั้งคนเก่าและคนที่เข้ามาใหม่\n4. เวลาตั้งคำถาม กรุณาบอกรายละเอียดให้ได้มากที่สุดเพื่อง่ายต่อการช่วยเหลือ\n5. ใช้ \` code block \`ในการแสดง code ต่างๆเพื่อให้ง่ายต่อการอ่าน\n6. คุยกันให้เหมาะสมกับห้องนั้นๆ\n\n*Note: กฎอาจเกิดการเปลี่ยนบ่อยครั้ง เพราะอย่างนั้นควรจะเช็ค channel นี้บ่อยๆเพื่อตัวท่านเอง.*\n`
  )
}

export const name: string = 'rule'
export const description: string = 'คำสั่งในการสร้างกฎเริ่มต้น.'
export const cooldown: number = 10
export const icon: string = '📚'
