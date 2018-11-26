#define _ABSTRACT_PLAYER_H
#ifndef _ABSTRACT_PLAYER_H

#include <string>
#include <vector>
#include "Card.h"

class AbstractPlayer {
	std::string val;
	std::vector<Card *> handOfCards;
	bool playing;

public:
	// Destructor
	~AbstractPlayer();

	// Pure Virtual Methods
	virtual void setPlay(bool playStatus)=0;
	virtual void addCard(Card *)=0;
	virtual std::string getTrump(std::string )=0;
	virtual void pickTrump(std::string )=0;
	virtual Card *playCard(std::string )=0;
};

#endif