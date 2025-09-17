---
title: "From Single to Multi: Evolving a Slime-Based Game Combat System"
description: "A deep dive into implementing multiple slime types and advanced running mechanics in a Phaser 3 game, covering animation systems, physics optimization, and cross-platform controls."
pubDatetime: 2025-08-24T15:00:00+02:00
tags: ["game-development", "phaser3", "typescript", "animation", "physics", "mobile-controls"]
heroImage: "/assets/slime-evolution-hero.png"
---

# From Single to Multi: Evolving a Slime-Based Game Combat System

August 24th turned into one of those intensive game development sessions where a simple feature request snowballs into a comprehensive system overhaul. What started as "add more slime types" evolved into implementing 60+ animations, advanced running mechanics, and platform-specific controls.

## The Challenge: Beyond Single Slime Combat

My Phaser 3 prototype had been running with a single green slime enemy. While functional, the combat lacked visual variety and the movement system felt too basic for engaging gameplay. The goal was ambitious:

- **Multiple slime variants** with complete animation sets
- **Advanced running system** with platform-specific controls
- **Seamless integration** with existing combat mechanics
- **Cross-platform optimization** for both desktop and mobile

## The Animation Architecture Challenge

### Asset Integration Strategy

The first challenge was managing a significant asset expansion. I had pixel art for three slime types (green, blue, pink), each requiring five animation states across four directions:

- **States**: Idle, Walk, Attack, Hurt, Death
- **Directions**: Down, Up, Left, Right
- **Types**: 3 distinct slime variants

**The math**: 5 states × 4 directions × 3 types = **60 animations**

### Implementation Approach

Rather than creating a complex factory system, I opted for a systematic naming convention that would scale:

```typescript
// Consistent naming pattern for all slime animations
this.anims.create({
  key: 'slime1-idle-down',
  frames: this.anims.generateFrameNames('slime1Idle', {
    frames: [0, 1, 2, 3, 4, 5]
  }),
  frameRate: 8,
  repeat: -1
});
```

This approach maintained readability while enabling random slime type selection:

```typescript
// Random type selection on respawn
this.slimeType = Phaser.Math.Between(1, 3);
this.slime.play(`slime${this.slimeType}-idle-down`);
```

## Advanced Running System Implementation

### The Platform-Specific Challenge

Desktop and mobile players needed different running triggers:
- **Desktop**: Double-tap detection for intuitive keyboard control
- **Mobile**: Joystick distance for variable speed control

### Desktop Double-Tap Detection

```typescript
private handleKeyPress(direction: string): void {
  const now = Date.now();
  const lastPress = this.lastKeyPress[direction];

  if (lastPress && (now - lastPress) < this.doubleTapThreshold) {
    this.isRunning = true; // Double-tap detected
  }

  this.lastKeyPress[direction] = now;
}
```

### Mobile Joystick Integration

```typescript
// Mobile: Joystick force determines running state
const force = this.joyStick.force;
const threshold = 0.7; // Run when joystick pushed >70% to edge
isRunning = force > threshold;
```

### Dynamic Speed System

The beauty of this implementation was its simplicity:

```typescript
// Single line determines movement speed
const currentSpeed = this.isRunning ? this.runSpeed : this.playerSpeed;
```

This created natural speed transitions:
- **Walking**: 2 units per frame
- **Running**: 4 units per frame
- **Running Attacks**: Full speed with combat capability

## Physics Debugging and Optimization

### The Scaling Problem

During implementation, I discovered sword hitboxes weren't scaling properly on screen resize. The issue was subtle but critical - physics bodies weren't updating their scale factor.

**Root Cause**: Desktop-only hitbox updates without proper physics body scaling

**Solution**: Unified scaling approach for all platforms

```typescript
// Update sword hitbox for both desktop and mobile
if (this.swordHitbox) {
  const hitboxRadius = this.sys.game.device.os.desktop ? 60 * baseScale : 30 * baseScale;
  this.swordHitbox.setSize(hitboxRadius * 2, hitboxRadius * 2);
  (this.swordHitbox.body as Phaser.Physics.Arcade.Body).setCircle(hitboxRadius);
}
```

### Debug Mode for Visual Verification

Enabling debug mode proved invaluable for collision verification:

```typescript
arcade: {
  gravity: { x: 0, y: 0 },
  debug: true // Visual physics body rendering
}
```

This revealed the scaling issues immediately and confirmed the fixes were working correctly.

## State Machine Evolution

### Extended Player States

The running system required expanding the player state machine:

```typescript
enum PlayerState {
  IDLE,
  WALKING,
  RUNNING,        // New: Base running state
  ATTACKING,
  RUNNING_ATTACK, // New: Attack while running
  HURT,
  DEAD
}
```

This enabled seamless transitions between movement types while maintaining combat responsiveness.

## Technical Outcomes and Metrics

### Code Quality Results
- **Files Modified**: 2 core files (clean, focused changes)
- **Assets Added**: 13 new spritesheet files
- **Code Changes**: 524 insertions, 27 deletions
- **TypeScript Compliance**: 100% - zero build errors
- **Animation Count**: 60+ new animations

### Performance Impact
Despite a 4x increase in animation assets, there was **no measurable performance impact**. Phaser 3's animation system handled the load efficiently, and the random spawning prevented memory issues.

### User Experience Improvements
- **Visual Variety**: Each slime death spawns a different colored enemy
- **Enhanced Combat**: Running attacks create more dynamic gameplay
- **Platform Optimization**: Controls feel natural on both desktop and mobile
- **Responsive Design**: All scaling issues resolved across screen sizes

## Development Insights

### What Worked Well

**Systematic Animation Creation**: The naming convention made managing 60+ animations straightforward rather than overwhelming.

**Platform-Agnostic Design**: Building running mechanics that felt native to both input methods required careful consideration but paid off in user experience.

**Debug-First Problem Solving**: Enabling visual physics debugging immediately revealed scaling issues that might have taken much longer to identify.

### Technical Debt and Future Considerations

While the implementation is solid, there are opportunities for abstraction:

- **SlimeFactory class** could centralize slime creation logic
- **Animation loops** could automate the repetitive animation creation
- **Dynamic asset loading** could improve initial load times

## The Bigger Picture

This session exemplified how game development often involves solving multiple interconnected problems simultaneously. What started as "add more slime types" required:

- Asset management and organization
- Animation system architecture
- Physics debugging and optimization
- Cross-platform input handling
- State machine expansion
- Performance consideration

Each piece influenced the others, creating a cohesive system that enhanced the game's core mechanics.

## Looking Forward

The framework now supports easy addition of new slime types, different behaviors per variant, and more sophisticated combat mechanics. The running system creates a foundation for more advanced movement abilities, and the animation architecture can scale to support additional enemy types.

*Sometimes the best game development sessions are the ones where you solve problems you didn't know you had while implementing features you thought would be simple.*

---

**Tags:** #game-development #phaser3 #typescript #animation #physics #mobile-controls