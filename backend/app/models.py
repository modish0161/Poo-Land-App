from datetime import datetime
from . import db

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'player_name': self.player_name,
            'score': self.score,
            'level': self.level,
            'timestamp': self.timestamp.isoformat()
        }
